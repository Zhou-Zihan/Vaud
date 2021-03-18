let queryrecommand = d3.select('#queryrecommand')

queryrecommand
	.append('div')
	.attr('width', '100%')
	.style('height', '50px')
	.style('background', '#1bbd9c')
	.style('color', 'white')
	.style('text-align', 'center')
	.style('line-height', '50px')
	.style('font-size', '16px')
	.style('font-weight', 'bold')
	.text('Recommendation')
