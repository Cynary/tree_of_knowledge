from node import node
Tree = {}

def findNode(name = ""):
    for i in Tree.values():
        if i.name == name:
            return i

def nodeToDict(node):
    return {
        'ID': node.ID,
        'name': node.name,
        'content': node.content, # Make this the description!!!!
        };
        
def searchNode(keywords):
    keys = keywords.split(' ')
    matches = []  # list of matched node, (% matched, #matched, id)
    for i in Tree.values():
        matched = [k for k in keys if k in i.getKeywords()]
        if len(matched) !=0:
            matches.append([-float(len(matched))/len(i.keywords), -len(matched), i])
    
    matches.sort()
    return {'command': 'found', 'content': [nodeToDict(i[2]) for i in matches]}

def addNode( name, content = '', keywords = set([]),  parents = [], children = [] ):
    #print "Add node " + name
    n = node( name, keywords, content, parents, children)
    Tree[n.ID] = n
    return {'command': 'addNode', 'node': nodeToDict(n)}

def deleteNode(nodeID):
    Tree[nodeID].deleteConnections()
    n = Tree[nodeID]
    del Tree[nodeID]
    return {'command': 'deleteNode', 'node': n.ID}

def addEdge(parID, childID):
    if parID in Tree and childID in Tree:
        Tree[parID].addChild(Tree[childID])
        return {'command': 'addEdge', 'edge': [parID,childID]}
    else:
        print "Error - It is not on the Tree"

def deleteEdge(parentID, childID):
    Tree[parentID].removeChild(Tree[childID])
    return {'command': 'deleteEdge', 'edge': [parentID, childID]}

def editContent(nodeID, newContent):
    Tree[nodeID].editContent(newContent)
    return {'command': 'editContent', 'content': nodeToDict(Tree[nodeID])}
