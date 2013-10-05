from node import node
from Tree import *

addNode("Root", set(["root", "first"]), 'First node')
print "ROOT ADDED"

for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

addNode("child", set(["child", "first"]), 'Child', ([findNode("Root")]))

print "LEAF added"
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

print  searchNode( ['first', 'root'])

addNode("ASD", set(["mock"]), "Banan", [(searchNode(['child'])[0])])

print Tree

delete(2)
print Tree
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

setParentof(1,3)
setParentof(0,20)

print Tree
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children
