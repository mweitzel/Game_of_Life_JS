GameView = function(boardId){
  var canvas = this.canvas = document.getElementById(boardId);
  canvas.height = document.body.clientHeight - 100;
  canvas.width = canvas.height;
  var ctx = this.ctx = canvas.getContext("2d");
  var my_gradient = ctx.createLinearGradient(0,0,0,canvas.height);
  my_gradient.addColorStop(0,"black");
  my_gradient.addColorStop(1,"grey");
  ctx.fillStyle = my_gradient;
}

GameView.prototype.drawCell = function(x,y,width,height, border) {
  this.ctx.fillRect(x,y,width-border,height-border);
};

GameView.prototype.cellDimension = function(){
  var cellWidth = (this.canvas.width/15);
  return cellWidth
};

GameView.prototype.drawBoard = function(){
  var self = this
  var allCells = board.allCells();
  _.each(allCells, function(cell){
    if (cell.life === true) {
      var cellDim = self.cellDimension();
      self.drawCell((cell.x)*cellDim,(cell.y)*cellDim,cellDim,cellDim, 5);
    }
  });
};

GameView.prototype.clearBoard = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


board = new Board(15)

var gameView = new GameView('board')
gameView.drawBoard();

setInterval(function(){
  board.performGeneration()
  gameView.clearBoard();
  gameView.drawBoard();
}, 300);