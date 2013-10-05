class node:
    count = 0
    def __init__(self, name, keywords = set([]), content = '', parents = {}, children = {}):

        self.ID = self.count
        node.count = node.count+1

        self.parents = {}
        for parent in parents:
            self.addParent(parent)
        self.children = {}
        for child in children:
            self.addChild(child)
        self.content = content
        self.keywords = keywords
        self.name = name
       

    def getName(self):
        return self.name
    
    def getParents(self):
        return self.parents

    def getChildren(self):
        return self.children

    def addParent(self, parent):
        if parent.ID not in self.parents:
            self.parents[parent.ID] = parent
            parent.addChild(self)

    def addChild(self, child):
        if child.ID not in self.children:
            self.children[child.ID] = child
            child.addParent(self)

    def getContent(self):
        return self.content

    def getKeywords(self):
        return self.keywords

    def generateKeywords(self):
        pass

    def editContent(self, newContent):
        self.content = newContent

    def removeParent(self, oldParent):
        if oldParent.ID in self.parents:
            del self.parents[oldParent.ID]
            oldParent.removeChild(self)

    def removeChild(self, oldChild):
        if oldChild.ID in self.children:
            del self.children[oldChild.ID]
            oldChild.removeParent(self)

    def __hash__(self):
        return self.ID


