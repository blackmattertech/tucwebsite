"""
User-scoped camera instance manager.
Keys cameras by (user_id, camera_source) so each logged-in user gets isolated
camera instances (e.g. per user and per source like 0 or rtsp://...).
"""
import threading

# Lazy import to avoid requiring cv2 at import time if only app routes are loaded
def _cv2():
    import cv2
    return cv2


class UserCameraManager:
    """Manages cv2.VideoCapture instances per (user_id, camera_source)."""

    def __init__(self):
        self._cameras = {}  # (user_id, camera_source) -> cv2.VideoCapture
        self._lock = threading.Lock()

    def _key(self, user_id, camera_source):
        return (str(user_id), str(camera_source))

    def get_camera(self, user_id, camera_source):
        """Get or create a VideoCapture for this user and source."""
        cv2 = _cv2()
        key = self._key(user_id, camera_source)
        with self._lock:
            if key not in self._cameras or not self._cameras[key].isOpened():
                self._release_impl(key)
                try:
                    source = int(camera_source)
                except (ValueError, TypeError):
                    source = camera_source
                cap = cv2.VideoCapture(source)
                if not cap.isOpened():
                    return None
                self._cameras[key] = cap
            return self._cameras[key]

    def _release_impl(self, key):
        if key in self._cameras:
            try:
                self._cameras[key].release()
            except Exception:
                pass
            del self._cameras[key]

    def release_camera(self, user_id, camera_source):
        """Release the camera for this user and source (e.g. when stream ends)."""
        key = self._key(user_id, camera_source)
        with self._lock:
            self._release_impl(key)


# Singleton used by app and face_locker
_manager = None
_manager_lock = threading.Lock()


def get_user_camera_manager():
    global _manager
    with _manager_lock:
        if _manager is None:
            _manager = UserCameraManager()
    return _manager
