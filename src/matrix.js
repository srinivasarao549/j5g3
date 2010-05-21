/**
 * Matrix Library for JSGE
 */

/**
 * Matrix class
 * Constructor takes elements as:
 * new j5g3.Matrix([1, 3, 4]) => Creates a 1x3 Matrix
 * new j5g3.Matrix([[1, 3, 4], [1,3,4]]) => Creates a 2x3 Matrix
 */
j5g3.Matrix = function(elements)
{
	this._elements = (arguments.length > 1) ? [ arguments ] : elements;


	/**
	 * A.add(B) - returns A + B
	 */
	this.add = function(B)
	{
		return this.map(function(v, r, c) { return v + B.e(r,c); });
	};

	/**
	 * Appends matrix B to the right hand side
	 */
	this.augment = function(B)
	{
		var A = this;
		return j5g3.Matrix.Func(this.rows(), this.cols() + B.cols(), function(r, c) {
			return (c >= A.cols()) ? B.e(r, c-A.cols()) : A.e(r, c);
		});
	}

	/**
	 * Returns Column n as a vector.
	 */
	this.col = function(n)
	{
		var a = [];
		for (var i = 0; i < this.rows(); i++)
			a.push(this.e(i, n));

		return new j5g3.Matrix([ a ]);
	};

	/**
	 * Returns number of columns
	 */
	this.cols = function()
	{
		return this._elements[0].length;
	};

	/**
	 * Returns determinant.
	 */
	this.determinant = function()
	{
		if (this.rows() == 2)
			return this.e(0,0) * this.e(1,1) - this.e(0, 1)*this.e(1,0);

		var i = 0;
		
	};

	/**
	 * Returns its leading diagonal elements as a vector.
	 */
	this.diagonal = function()
	{
		a = [];
		for (var i = 0; i < this.rows(); i++)
			a.push(this.e(i, i));
		return new j5g3.Matrix([ a ]);
	};

	/**
	 * Returns a copy of the matrix.
	 */
	this.duplicate = function()
	{
		return new j5g3.Matrix(this._elements.slice(0));
	};

	/**
	 * Returns elements at nth row and mth column.
	 */
	this.e = function(n, m)
	{
		return this._elements[n][m];
	};

	/**
	 * Calls func for every element of the matrix as func(value, row, column)
	 */
	this.each = function(func)
	{
		for (var r = 0; r < this.rows(); r++)
			for (var c = 0; c < this.rows(); c++)
				func(this.e(r,c), r, c);
	};

	/**
	 * Returns true if matrix is equal to B
	 */
	this.eq = function(B)
	{
		for (var y=0; y < this.rows(); y++)
			for (var x = 0; x<this.cols(); x++)
				if (this.e(y,x) != B.e(y,x))
					return false;
		return true;
	};

	this.gaussian = function()
	{	
		var cols = this.cols();
		var rows = this.rows();
		var pivot, c, r, i;
		var arr = this._elements.slice(0);

		for (c = 0; c < cols-1; c++)
			for (r=0; r < rows; r++)
			{
				pivot = this.e(r, c) / this.e(c, c);
				if (r != c)
				{
					for (i = 0; i < cols; i++)
						arr[r][i] = this.e(r, i) - pivot * this.e(c, i);
				}
			}

		for (i = 0; i < rows; i++)
		{
			arr[i][cols-1] /= arr[i][i];
			arr[i][i] = 1;
		}

		return new j5g3.Matrix(arr);
	};

	/**
	 * Returns the inverse of the matrix.
	 */
	this.inverse = function()
	{
		var m = this.augment(new j5g3.Matrix.I(this.rows()));
		m = m.gaussian();		

	//	m.slice(0, this.rows());
		return m;
	};

	/**
	 * Returns true if the matrix is singular ( zero determinant )
	 */
	this.is_singular = function()
	{
		return this.determinant === 0;
	};

	/**
	 * Returns true if the matrix is square
	 */
	this.is_square = function()
	{
		return this.rows() == this.cols();
	};

	/**
	 * Returns a new matrix with the result of func(element, row, col) for every element.
	 */
	this.map = function(func)
	{
		var result = [];
		this.each(function(v, r, c) {
			if (!result[r]) result[r] = [];

			result[r][c] = func(v, r, c);
		});

		return new j5g3.Matrix(result);
	};

	/**
	 * Returns Max Value
	 */
	this.max = function()
	{
		var result;
		this.each(function(v) { if (v > result) result = v; });
		return result;
	};

	/**
	 * Returns minimum value
	 */
	this.min = function()
	{
		var result;
		this.each(function(v) { if (v < result) result = v; });
		return result;
	};

	this.multiply = function()
	{
		
	};

	/**
	 * Returns a copy of the matrix with all its elements rounded
	 */
	this.round = function()
	{
		return this.map(function(v) { return Math.round(v); });	
	};

	/**
	 * Returns row n as a vector
	 */
	this.row = function(n)
	{
		return new j5g3.Matrix([this._elements[n]]);
	};

	/**
	 * Returns number of rows
	 */
	this.rows = function()
	{
		return this._elements.length;
	};

	/**
	 * Slices elements from row r col c to end.
	 */
	this.slice = function(r, c)
	{
		var rows = this.rows();
		for (var i = r; i < rows; i++)
			this._elements[i] = this._elements[i].slice(c);
	};

	this.substract = function(B)
	{		
		return this.map(function(v, r, c) { return v - B.e(r, c); });
	};

	this.to_right_triangular = function()
	{
		
	};

	this.to_str = function(precision)
	{
		if (precision===undefined)
			precision = 4;

		var len = precision + 3;
		var result = '';

		var pad = function(n)
		{
			var x = n.toPrecision(precision);
			if (x.length < len)
				for (var i = 0; i <= len- x.length; i++)
					x += ' ';
			return x;
		};

		for (var r = 0; r < this.rows(); r++)
		{
			result += '[ ';
			for (var c = 0; c < this.cols(); c++)
				result += pad(this.e(r, c)) + ' ';
			result += "]\n";
		}

		return result;
	}

	this.trace = function()
	{
	};

	this.transpose = function()
	{
	};
}

/**
 * Constructor.
 * Returns a n * m matrix where all the elements are calculated by function func.
 */
j5g3.Matrix.Func = function(n, m, func)
{
	var a = [];
	for (var y = 0; y < n; y++)
	{
		a[y] = [];
		for (var x = 0; x < m; x++)
			a[y].push(func(y,x));
	}

	return new j5g3.Matrix(a);
}

/**
 * Constructor.
 * Returns a square matrix whose leading-diagonal elements are the values in the array elements and whose off diagonal elements are zero.
 */
j5g3.Matrix.Diagonal = function()
{
	var elems = arguments;
	return j5g3.Matrix.Func(arguments.length, arguments.length, function(x,y) { return x == y ? elems[y] : 0; });
}

/**
 * Constructor
 * Returns the n*n identity matrix.
 */
j5g3.Matrix.I = function(n)
{
	return j5g3.Matrix.Func(n, n, function(x,y) { return x == y ? 1 : 0 });
};

/**
 * Constructor
 * Returns a matrix with n rows and m columns where all the elements are random numbers between 0 and 1.
 * If m is undefined it will create a n*n matrix.
 */
j5g3.Matrix.Random = function(n, m)
{
	return j5g3.Matrix.Func(n, m === undefined ? n : m, function() { return Math.random(); });
}

/**
 * Constructor
 * Returns a matrix with n rows and m columns where all the elements are zero.
 */
j5g3.Matrix.Zero = function(n, m)
{
	return j5g3.Matrix.Func(n, m, function() { return 0; });
}
