from flask import Flask, render_template, make_response
import numpy
from stl import mesh
from io import BytesIO

app = Flask(__name__, template_folder='components', static_folder='js')


@app.route('/object.stl')
def stl_gen(n=1):
    # tetrahedron mesh
    data = numpy.zeros(4, dtype=mesh.Mesh.dtype)
    b1, b2, b3, t = (1, 0, 1), (0, 0, -1), (-1, 0, 1), (0, 1, 0)
    data['vectors'][0] = numpy.array([b1, b2, b3])
    data['vectors'][1] = numpy.array([b1, b2, t])
    data['vectors'][2] = numpy.array([b2, b3, t])
    data['vectors'][3] = numpy.array([b3, b1, t])
    object_mesh = mesh.Mesh(data, remove_empty_areas=False)

    output = BytesIO()
    object_mesh._write_ascii(output, "object.stl")
    response = make_response(output.getvalue())
    return response


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
