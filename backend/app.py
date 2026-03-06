"""
Flask app with Flask-Login and (user_id, camera_source)-scoped video feed.
"""
import os
from flask import Flask, Response, request, redirect, url_for, render_template_string
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
    UserMixin,
)

# Optional: use a real user store (DB, etc.)
class User(UserMixin):
    def __init__(self, id_, username):
        self.id = id_
        self.username = username


# In-memory demo users; replace with DB lookup in production
USERS = {
    "1": User("1", "alice"),
    "2": User("2", "bob"),
}


def get_user_by_id(user_id):
    return USERS.get(str(user_id))


def get_user_by_username(username):
    for u in USERS.values():
        if u.username == username:
            return u
    return None


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "change-me-in-production")

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    return get_user_by_id(user_id)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        # Demo: accept any non-empty username (no real password check)
        if username:
            user = get_user_by_username(username) or User(str(len(USERS) + 1), username)
            USERS[str(user.id)] = user
            login_user(user)
            return redirect(request.args.get("next") or url_for("index"))
    return render_template_string("""
        <form method="post">
            <label>Username <input name="username" required></label><br>
            <label>Password <input type="password" name="password"></label><br>
            <button type="submit">Log in</button>
        </form>
    """)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route("/")
def index():
    if current_user.is_authenticated:
        return render_template_string("""
            <p>Hello, {{ current_user.username }}. <a href="{{ url_for('logout') }}">Log out</a></p>
            <p>Video feed (default camera 0): <a href="{{ url_for('video_feed') }}">/video_feed</a></p>
            <p>With RTSP: <a href="{{ url_for('video_feed') }}?camera_source=rtsp://user:pass@ip:port/stream">?camera_source=rtsp://...</a></p>
            <img src="{{ url_for('video_feed', camera_source='0') }}" alt="Video stream" />
        """)
    return render_template_string('<p>Please <a href="{{ url_for("login") }}">log in</a>.</p>')


@app.route("/video_feed")
@login_required
def video_feed():
    """Stream from camera scoped to current_user and camera_source. Requires login."""
    camera_source = request.args.get("camera_source", "0")
    from face_locker import gen_frames

    return Response(
        gen_frames(current_user.id, camera_source),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


if __name__ == "__main__":
    app.run(debug=True)
