import json

f = open("mapa.json")
data = json.load(f)
cidades = data["cidades"]
ligacoes = data["ligações"]
cidades.sort(key=lambda d: d['nome'])

dic = {}

pagweb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <!-- Lista com o índice -->
                    <ul>
"""

for c in cidades:
    dic[c['id']] = c['nome']
    pagweb += f"""
                        <li>
                            <a href='#{c['id']}'>{c['nome']}</a>
                        </li>
"""

pagweb += """
                    </ul>
                </td>
                <td witdh="70%">
                    <!--- Informação das cidades-->
"""

for c in cidades:
    id = c['id']
    lsod = [l for l in ligacoes if l['origem'] == id]
    lsdo = [l for l in ligacoes if l['destino'] == id]
    pagweb += f"""
                        <a name='{c['id']}'>
                        <h3>{c['nome']}</h3>
                        <p><b>População:</b> {c['população']}</p>
                        <p><b>Descrição:</b> {c['descrição']}</p>
                        <p><b>Distrito:</b> {c['distrito']}</p>
                        </a>
                        <table width="100%">
                            <tr>
                                <td valign="top">
                                    <b>Ligações Origem-Destino</b>
"""
    for l in lsod:
        pagweb += f"""
                                    <p><a href=#{l['destino']}>{dic[l['destino']]}</a>
                                    <b>Distância:</b> {l['distância']} km</p>
    """
    pagweb+="""
                                </td>
                                <td valign="top">
                                    <b>Ligações Destino-Origem</b>
    """
    for l in lsdo:
        pagweb += f"""
                                    <p><a href=#{l['origem']}>{dic[l['origem']]}</a>
                                    <b>Distância:</b> {l['distância']} km</p>
    """
    pagweb += """
                                </td>
                            </tr>
                        </table>
                        <center>
                            <hr width="80%">
                        </center>
    """

pagweb += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

fs = open("mapa.html","w+")
fs.write(pagweb)


"""TODO:

    utilizar informções das ligações no dataset

"""