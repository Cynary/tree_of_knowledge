from node import node
Tree = {}

def findNode(name = ""):
    for i in Tree.values():
        if i.name == name:
            return i

def seachNode(keys = []):
    for i in Tree.values():
        

Tree[node.count] = node("Root", set(["Root", "First step"]), 'First node')

print "ROOT ADDED"
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

Tree[node.count] = node("child", set(["child"]), 'Child', ([findNode("Root")]))

print "LEAF added"
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

print Tree
