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

print "\nSearch for first root"
print  searchNode( ['first', 'root'])


addNode("ASD", set(["mock"]), "Banan", [(searchNode(['child'])[0])])

print Tree

print "\nDelete second node"
delete(2)
print Tree
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

print "\nAdd connection 1,3"
setParentof(1,3)
print "\nAdd connection 0,20"
setParentof(0,20)

print Tree
for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

print "\nTry to Add loop"
addNode("Loop", set(["loop"]), "Looping", [(searchNode(['mock'])[0])], [(searchNode(['root'])[0])])

print Tree

for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children
