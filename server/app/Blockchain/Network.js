function ConnectNodes(chain, req) {
    const { nodes } = req.body
    if (nodes.length > 0){
        for (let i = 1; i < nodes.length; i++) {
            console.log(nodes[i])
          }
    }else{
        console.log('no nodes to add')
    }
  }

  module.exports = {
      ConnectNodes
  };