/**************************************************************************************
 * This file is used to define interpolation for the animations 
 * 1. for given set of end points and the control points, the curve is defined
 * 1.1 the end-points and control points are generated randomly within the screen limit.
 * 2. then the point is calculated on the defined curve for a given y-coordinate.
 * 3. the next point is interpolated along x-axis for the given y-axis.
 * 
 */

Game.Interpolation = function() {
	
	/**
	 * bring in use
	 * http://snipplr.com/view/47206/
	 */
	
	function lineInterpolate( point1, point2, distance )
	{
	  var xabs = Math.abs( point1.x - point2.x );
	  var yabs = Math.abs( point1.y - point2.y );
	  var xdiff = point2.x - point1.x;
	  var ydiff = point2.y - point1.y;

	  var length = Math.sqrt( ( Math.pow( xabs, 2 ) + Math.pow( yabs, 2 ) ) );
	  var steps = length / distance;
	  var xstep = xdiff / steps;
	  var ystep = ydiff / steps;

	  var newx = 0;
	  var newy = 0;
	  var result = new Array();

	  for( var s = 0; s < steps; s++ )
	  {
	    newx = point1.x + ( xstep * s );
	    newy = point1.y + ( ystep * s );
	            
	    result.push( {
	      x: newx,
	      y: newy
	    } );
	  }

	  return result;
	}
};
