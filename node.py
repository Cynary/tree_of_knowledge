class node:
    count = 0
    def __init__(self, name, keywords = set([]), content = '', parents = set([]), children = set([])):
        self.parents = parents
        self.children = children
        self.content = content
        self.keywords = keywords
        self.name = name
        self.ID = self.count
        node.count = node.count+1

    def getName(self):
        return self.name
    
    def getParents(self):
        return self.parents

    def getChildren(self):
        return self.children

    def addParent(self, parent):
        if parent not in self.parents:
            self.parents.add(parent)
            parent.addChild(self)

    def addChild(self, child):
        if child not in self.children:
            self.children.add(child)
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
        if oldParent in self.parents:
            self.parents.remove(oldParent)
            oldParent.removeChild(self)

    def removeChild(self, oldChild):
        if oldChild in self.children:
            self.children.remove(oldChild)
            oldChild.removeParent(self)

    def __hash__(self):
        return self.ID


