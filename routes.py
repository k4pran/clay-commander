from flask import render_template, Blueprint

command_component = Blueprint('command', __name__, template_folder='templates', static_folder='static', static_url_path='/app/static')

@command_component.route('/')
def command():
    return render_template('command.html', title="command")

