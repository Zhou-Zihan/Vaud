let queryrecommand = d3.select('#queryrecommand')
var heat = L.heatLayer([]).addTo(map)
map.on('zoomend', function () {
	console.log(map.getZoom())
	heat.setOptions({ blur: map.getZoom() })
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
				if (result[i].value != 0) {
					latlngs.push([
						result[i].latitude,
						result[i].longitude,
						result[i].value,
					])
				}
			}
			heat.setOptions({
				radius: 40,
				max: 0.02,
				blur: 25,
			})
			heat.setLatLngs(latlngs)
		} else {
			d3.select(this).attr('show', 'false')
			heat.setLatLngs([])
		}
	})
