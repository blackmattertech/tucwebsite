"""
Face detection/recognition and frame generation for the video stream.
Uses UserCameraManager so each (user_id, camera_source) has an isolated camera.
"""
import cv2
import numpy as np

# Optional: plug in your detector loading and frame processing
# from .some_module import load_face_detector, process_frame


def load_face_detector(detector_name='haarcascade_frontalface_default'):
    """Load face detector (stub: returns None; replace with real implementation)."""
    try:
        path = cv2.data.haarcascades + f"{detector_name}.xml"
        return cv2.CascadeClassifier(path)
    except Exception:
        return None


def process_frame(frame, face_detector):
    """Process frame (e.g. draw face boxes). Returns frame (unchanged if no detector)."""
    if face_detector is not None:
        try:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_detector.detectMultiScale(gray, 1.1, 4)
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        except Exception:
            pass
    return frame


def gen_frames(user_id, camera_source='0', detector_name='haarcascade_frontalface_default'):
    """
    Generator that yields MJPEG frames for the given user and camera source.
    Uses UserCameraManager for (user_id, camera_source)-scoped camera.
    Releases the camera when the generator is closed (e.g. client disconnect).
    """
    from camera_manager import get_user_camera_manager

    manager = get_user_camera_manager()
    camera = manager.get_camera(user_id, camera_source)
    if camera is None:
        return

    face_detector = load_face_detector(detector_name)
    try:
        while True:
            success, frame = camera.read()
            if not success:
                manager.release_camera(user_id, camera_source)
                camera = manager.get_camera(user_id, camera_source)
                if camera is None:
                    break
                continue
            processed = process_frame(frame, face_detector)
            ret, buffer = cv2.imencode('.jpg', processed)
            if not ret:
                continue
            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n'
            )
    finally:
        manager.release_camera(user_id, camera_source)
