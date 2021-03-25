let queryrecommand = d3.select('#queryrecommand')
var heat = L.heatLayer([]).addTo(map)
map.on('zoomend', function () {
	heat.setOptions({ radius: map.getZoom() })
})

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

queryrecommand
	.append('img')
	.attr('src', 'image/heatmap.png')
	.style('position', 'absolute')
	.style('top', '10px')
	.style('right', '10px')
	.attr('width', '30px')
	.attr('height', '30px')
	.attr('show', 'false')
	.on('mouseup', function () {
		if (d3.select(this).attr('show') == 'false') {
			d3.select(this).attr('show', true)
			var result = recolist.heatmap
			var latlngs = []
			for (var i = 0; i < result.length; i++) {
				latlngs.push([
					result[i].latitude,
					result[i].longitude,
					result[i].value * 100,
				])
			}
			Heatmap_Object.setOptions({
				radius: 500,
				max: 2,
			})
			heat.setLatLngs(latlngs)
		} else {
			d3.select(this).attr('show', 'false')
			heat.setLatLngs([])
		}
	})
