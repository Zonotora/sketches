import os

path = os.path.dirname(os.path.abspath(__file__))


def generate_index(dir, files):
    def generate_script(name):
        return f'<script  src="{name}"></script>'

    scripts = "\n".join([generate_script(name) for name in files])

    return f"""<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{dir}</title>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script>
        <script src="../dom.js"></script>
        {scripts}
        <link rel="stylesheet" href="../styles.css">
    </head>
    <body>
        <div id="header" >
        </div>
        <main>
        </main>
    </body>
    </html>
    """


for d in os.listdir("."):
    if os.path.isdir(d) and not d.startswith("."):
        directory = os.path.join(path, d)
        file = os.path.join(directory, "index.html")
        files = [f for f in os.listdir(directory) if f.endswith(".js")]
        html = generate_index(d, files)
        with open(file, "w") as f:
            f.write(html)
