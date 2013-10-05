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

testcontent = "Calculus is the mathematical study of change, in the same way that geometry is the study of shape and algebra is the study of operations and their application to solving equations. It has two major branches, differential calculus (concerning rates of change and slopes of curves), and integral calculus (concerning accumulation of quantities and the areas under curves); these two branches are related to each other by the fundamental theorem of calculus. Both branches make use of the fundamental notions of convergence of infinite sequences and infinite series to a well-defined limit. Generally considered to have been founded in the 17th century by Isaac Newton and Gottfried Leibniz, today calculus has widespread uses in science, engineering and economics and can solve many problems that algebra alone cannot."

print "Alchemy API Tests"
for i in Tree.values():
  i.editContent(testcontent)
  i.generateSuggestedKeywords()
  print i.getSuggestedKeywords()

print "Finished"

print "\nTry to Add loop"
addNode("Loop", set(["loop"]), "Looping", [(searchNode(['mock'])[0])], [(searchNode(['root'])[0])])

print Tree

for i in Tree.values():
    print i.name, i.keywords, i.parents, i.children

