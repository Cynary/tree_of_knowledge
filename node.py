from __future__ import print_function
from alchemyapi import AlchemyAPI
import json

class node:
    count = 0
    def __init__(self, name, keywords = set([]), content = '', parents = [], children = []):

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
        self.suggestedkeywords = set([])
        self.name = name
       
    def __str__ (self):
        return self.name

    def __repr__ (self):
        return self.__str__()

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

    #Keywords are for human-set keywords, suggestedkeywords are automatically generated
    def getKeywords(self):
        return self.keywords

    def setKeywords(self, newkeywords):
	self.keywords = newkeywords
	pass
      
    def getSuggestedKeywords(self):
	return self.suggestedkeywords
    
    def generateSuggestedKeywords(self):
        alchemyapi = AlchemyAPI()
        self.suggestedkeywords = set([])
        response = alchemyapi.keywords('text',self.content, { 'sentiment':1 })
	if response['status'] == 'OK':
		for keyword in response['keywords']:
		    self.suggestedkeywords.add(keyword['text'].encode('ascii','ignore'))
	else:
		print('Error in keyword extaction call: ', response['statusInfo'])
		self.suggestedkeywords = set(["Automatic keyword generation failed"])
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
        
    def deleteConnections(self):
        for i in self.parents.values():
            self.removeParent(i)
        for i in self.children.values():
            self.removeChild(i)
        


