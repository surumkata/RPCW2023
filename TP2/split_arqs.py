from lxml import etree
 
def stringify_children(node):
    from itertools import chain
    parts = ([node.text] +
            list(chain(*([c.text, etree.tostring(c), c.tail] for c in node.getchildren()))) +
            [node.tail])
    # filter removes possible Nones in texts and tails
    return ''.join(filter(None, parts))

tree = etree.parse('arq.xml')
elem = tree.getroot()
arqs = elem.findall('ARQELEM')

i = 0
arquivos = []

xml_assinatura = '<?xml version="1.0" encoding="iso-8859-1"?>\n'
xml_assinatura = bytes(xml_assinatura,"iso-8859-1")

for arq in arqs:
    i+=1
    arqx = open('arqs/arq' + str(i) + '.xml','wb')
    arqx.write(xml_assinatura)
    arqx.write(etree.tostring(arq, pretty_print=True))
    identi = arq.find('IDENTI')
    identi = stringify_children(identi)
    arquivos.append({
        'numero' : i,
        'identidade' : identi.strip()
    })

arquivos.sort(key=lambda a: a['identidade'])

index = open('index.html',"w+")

content = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Arquivos</title>
    </head>
    <body>
        <h1>Índice</h1>
        <ul>
"""


for arquivo in arquivos:
    content += f"""
                        <li>
                            <a href='/{arquivo['numero']}'>{arquivo['identidade']}</a>
                        </li>
"""

content += """
    </body>
</html>
"""

index.write(content)
