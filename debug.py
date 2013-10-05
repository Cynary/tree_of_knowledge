from node import node
Tree = {}

def findNode(name = ""):
    for i in Tree.values():
        if i.name == name:
            return i

def searchNode(keys = []):
    matches = []  # list of matched node, (% matched, #matched, id)
    for i in Tree.values():
        matched = [k for k in keys if k in i.getKeywords()]
        if len(matched) !=0:
            matches.append([-float(len(matched))/len(i.keywords), -len(matched), i])
    
    matches.sort()
    return [i[2] for i in matches]
        

Tree[node.count] = node("Root", set(["Root", "First"]), 'First node')

print "ROOT ADDED"
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

Tree[node.count] = node("child", set(["child", "First"]), 'Child', ([findNode("Root")]))

print "LEAF added"
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

print  searchNode( ['First', 'Root'])
