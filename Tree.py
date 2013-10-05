from node import node
Tree = {}

def findNode(name = ""):
    for i in Tree.values():
        if i.name == name:
            return i

def searchNode(keywords):
    keys = keywords.split(' ')
    matches = []  # list of matched node, (% matched, #matched, id)
    for i in Tree.values():
        matched = [k for k in keys if k in i.getKeywords()]
        if len(matched) !=0:
            matches.append([-float(len(matched))/len(i.keywords), -len(matched), i])
    
    matches.sort()
    return [i[2] for i in matches]
        
def addNode( name, content = '', keywords = set([]),  parents = [], children = [] ):
    #print "Add node " + name
    Tree[node.count] = node( name, keywords, content, parents, children)

def deleteNode(nodeID):
    Tree[nodeID].deleteConnections()
    del Tree[nodeID]

def addEdge(parID, childID):
    if parID in Tree and childID in Tree:
        Tree[parID].addChild(Tree[childID])
    else:
        print "Error - It is not on the Tree"

def deleteEdge(parentID, childID):
    Tree[parentID].removeChild(Tree[childID])

def editContent(nodeID, newContent):
    Tree[nodeID].editContent(newContent)
