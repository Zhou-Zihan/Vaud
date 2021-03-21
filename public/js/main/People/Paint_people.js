/**
 * Created by Administrator on 2016/3/23.
 */

/*************
 * @ person
 */

function paint_peopletraj(people, str) {
	//460022584127733
	/******************************************
	 *       load data
	 *******************************************/
	var data = people.data
	var latlngs = ''
	for (var i = 0; i < data.pInfo.length; i++) {
		// if(data.pInfo[i].time<timearea[1]&&
		//     data.pInfo[i].time>timearea[0]){
		if (data.pInfo[i].latitude > 0 && data.pInfo[i].longitude > 0) {
			var p = map.latLngToContainerPoint(
				L.latLng(data.pInfo[i].latitude, data.pInfo[i].longitude)
			)
			latlngs = latlngs + p.x + ',' + p.y + ' '
		}

		// }
	}

	/******************************************
	 *       paint traj
	 *******************************************/
	var polyline = d3
		.select('#mapobjectsvg')
		.append('polyline')
		.attr('class', 'peopletraj')
		.attr('points', latlngs)
	if (people.ismove != 0) {
		var polylineupper = d3
			.select('#mapobjectsvg')
			.append('polyline')
			.attr('points', latlngs)
		polylineupper.attr('class', 'peopletraj peopletrajismove')
		polyline.attr('class', 'peopletraj peopletrajismovebg')
	}
	if (typeof str !== 'undefined') {
		polyline.attr('id', str)
	}
}

function highlightpaint_peopletraj(people) {
	/******************************************
	 *       load data
	 *******************************************/
	var data = people.data
	latlngs = ''
	for (var i = 0; i < data.length; i++) {
		if (data[i].time < timearea[1] && data[i].time > timearea[0]) {
			var p = map.latLngToContainerPoint(
				L.latLng(data[i].lat, data[i].lon)
			)
			latlngs = latlngs + p.x + ',' + p.y + ' '
		}
	}
	/***************************
     draw people detail
     *************************/
	if (people.highlight != 0) {
		var highlightpeople = d3
			.select('#sceneviewfold')
			.append('div')
			.attr('class', 'highlightpeople')
			.style('z-index', people.highlight)
			.on('mouseup', function () {
				for (var i = 0; i < map_object.length; i++) {
					if (map_object[i].highlight > people.highlight) {
						map_object[i].highlight--
					}
				}
				people.highlight = map_highlightzindex - 1
				repaint_map_object()
			})
		//drag
		highlightpeople
			.append('div')
			.attr('class', 'highlightpeopletitle')
			.text(people.id)
			.on('mousedown', function () {
				d3.select('body')
					.append('svg')
					.style('position', 'absolute')
					.style('z-index', '1000')
					.style('width', '100%')
					.style('left', 0)
					.style('top', 0)
					.style('height', '100%')
					.on('mousemove', function () {
						highlightpeople
							.style('left', d3.event.x - 150 + 'px')
							.style('top', d3.event.y - 15 + 'px')
					})
					.on('mouseup', function () {
						d3.select(this).remove()
					})
			})

		/***************************
         fetch a point on the trajactory
         *************************/
		highlightpeople
			.append('div')
			.attr('class', 'highlightpeopleattr')
			.text('Extract a point on the trajactory')
			.on('mousedown', function () {
				console.log(people.data)
				positionselection = []
				for (var i = 0; i < people.data.length; i++) {
					if (
						people.data[i].time < timearea[1] &&
						people.data[i].time > timearea[0]
					) {
						positionselection.push({
							type: people,
							nodecount: people.node,
							data: people.data[i],
						})
					}
				}
				repaint_map_peoplepositionselection()
			})

		highlightpeople
			.append('img')
			.attr('src', 'image/map_objlist_people.svg')
			.style('position', 'absolute')
			.style('top', '0px')
			.attr('height', '28px')
			.attr('width', '28px')

		//delete
		highlightpeople
			.append('img')
			.attr('src', 'image/delete.svg')
			.style('position', 'absolute')
			.style('height', '16px')
			.style('width', '16px')
			.style('top', '6px')
			.style('right', '8px')
			.style('cursor', 'pointer')
			.on('mousedown', function () {
				people.highlight = 0
				highlightrepaint_map_object()
			})
	}
}

function paint_peoplelisttraj(peoplelist) {
	var data = peoplelist.data

	/***************************
     loaddata
     *************************/
	var thislistnum = 0
	for (var num = 0; num < data.length; num++) {
		var latlngs = '',
			isintime = false
		for (var i = 0; i < data[num].pInfo.length; i++) {
			if (
				data[num].pInfo[i].latitude > 0 &&
				data[num].pInfo[i].longitude > 0
			) {
				// if (
				// 	data[num].pInfo[i].time <= timearea[1] &&
				// 	data[num].pInfo[i].time >= timearea[0]
				// ) {
				isintime = true
				var p = map.latLngToContainerPoint(
					L.latLng(
						data[num].pInfo[i].latitude,
						data[num].pInfo[i].longitude
					)
				)
				latlngs = latlngs + p.x + ',' + p.y + ' '
				// }
			}
		}
		var polylinelist = { id: data[num].ID, path: latlngs }

		//paint traj
		if (isintime) {
			thislistnum++
		}

		var polyline = d3
			.select('#mapobjectsvg')
			.append('polyline')
			.attr('class', 'peopletraj peoplelisttrajpolyline')
			.attr('points', polylinelist.path)
			.attr('peopleid', polylinelist.id)
			.style('opacity', alpha)
			.on('mouseup', function () {
				console.log(d3.select(this).attr('peopleid'))
				add_mapobject(
					'people',
					d3.select(this).attr('peopleid'),
					peoplelist.node
				)
			})
		if (peoplelist.ismove != 0) {
			var polylineupper = d3
				.select('#mapobjectsvg')
				.append('polyline')
				.attr('points', polylinelist.path)
			polylineupper.attr(
				'class',
				'peopletraj peopletrajismove peoplelisttrajpolyline'
			)
			polyline.attr(
				'class',
				'peopletraj peopletrajismovebg peoplelisttrajpolyline'
			)
		}

		var alpha = 1
		// console.log(thislistnum)
		if (thislistnum > 10) alpha = 0.3
		if (thislistnum > 100) alpha = 0.12
		if (thislistnum > 500) alpha = 0.05
		d3.select('#mapobjectsvg')
			.selectAll('.peoplelisttrajpolyline')
			.style('stroke-opacity', alpha)
	}
}

function highlightpaint_peoplelisttraj(peoplelist) {
	if (peoplelist.highlight != 0) {
		var highlightpeople = d3
			.select('#sceneviewfold')
			.append('div')
			.attr('class', 'highlightpeople')
			.style('height', '28px')
			.style('z-index', peoplelist.highlight)
			.on('mouseup', function () {
				for (var i = 0; i < map_object.length; i++) {
					if (map_object[i].highlight > peoplelist.highlight) {
						map_object[i].highlight--
					}
				}
				peoplelist.highlight = map_highlightzindex - 1
				repaint_map_object()
			})
		//drag
		highlightpeople
			.append('div')
			.attr('class', 'highlightpeopletitle')
			.text(peoplelist.id)
			.on('mousedown', function () {
				d3.select('body')
					.append('svg')
					.style('position', 'absolute')
					.style('z-index', '1000')
					.style('width', '100%')
					.style('left', 0)
					.style('top', 0)
					.style('height', '100%')
					.on('mousemove', function () {
						highlightpeople
							.style('left', d3.event.x - 95 + 'px')
							.style('top', d3.event.y - 15 + 'px')
					})
					.on('mouseup', function () {
						d3.select(this).remove()
					})
			})
		showpeoplelistchart(peoplelist, highlightpeople)

		highlightpeople
			.append('img')
			.attr('src', 'image/map_objlist_people.svg')
			.style('position', 'absolute')
			.style('top', '0px')
			.attr('height', '28px')
			.attr('width', '28px')

		//delete
		highlightpeople
			.append('img')
			.attr('src', 'image/delete.svg')
			.style('position', 'absolute')
			.style('height', '16px')
			.style('width', '16px')
			.style('top', '6px')
			.style('right', '8px')
			.style('cursor', 'pointer')
			.on('mousedown', function () {
				peoplelist.highlight = 0
				highlightrepaint_map_object()
			})
	}
}

function showpeoplelistchart(peoplelist, highlightpeople) {
	var data = peoplelist.data
	var nodenum = peoplelist.node
	var thisdata = []
	for (var num = 0; num < data.length; num++) {
		for (var i = 0; i < data[num].pInfo.length; i++) {
			if (
				data[num].pInfo[i].latitude > 0 &&
				data[num].pInfo[i].longitude > 0
			) {
				// if (
				// 	data[num].pInfo[i].time <= timearea[1] &&
				// 	data[num].pInfo[i].time >= timearea[0]
				// ) {
				thisdata.push(data[num].pInfo[i])
				// }
			}
		}
	}
	//draw heatmap
	var latlngs = []
	for (var i = 0; i < thisdata.length; i++) {
		latlngs.push(L.latLng(thisdata[i].latitude, thisdata[i].longitude))
	}
	Heatmap_Object.setOptions({ radius: 10, max: thisdata.length / 1000 })
	objectheat_latlon = latlngs
	heatmapalive_detection()
}

function repaint_map_peoplepositionselection() {
	d3.select('#mapobjectsvg').selectAll('.map_positionselection').remove()
	for (var i = 0; i < positionselection.length; i++) {
		var latlon = [
			positionselection[i].data.lat,
			positionselection[i].data.lon,
		]
		var p = map.latLngToContainerPoint(L.latLng(latlon[0], latlon[1]))

		d3.select('#mapobjectsvg')
			.append('image')
			.style('position', 'absolute')
			.style('height', '20px')
			.style('width', '20px')
			.attr('x', p.x - 10 + 'px')
			.attr('y', p.y - 10 + 'px')
			.attr('class', 'map_positionselection')
			.style('pointer-events', 'all')
			.attr('xlink:href', function () {
				if (i == positionselectionhigh)
					return 'image/map_objlist_people.svg'
				return 'image/map_objlist_carempl.svg'
			})
			.attr('count', i)
			.attr('show', function () {
				if (i == positionselectionhigh) return 'true'
				return 'false'
			})
			.on('mousedown', function () {
				positionselectionhigh = d3.select(this).attr('count')
				d3.select(this).attr('show', 'true')
				d3.selectAll('.carpoint').remove()

				var data = positionselection[d3.select(this).attr('count')]
				var latlon = [data.data.lat, data.data.lon]
				var p = map.latLngToContainerPoint(
					L.latLng(latlon[0], latlon[1])
				)

				var highg = d3
					.select('#mapobjectsvg')
					.append('g')
					.attr('class', 'carpoint')
					.style('pointer-events', 'all')
					.attr('x', p.x - 75)
					.attr('y', p.y - 90)
				highg
					.append('rect')
					.attr('x', highg.attr('x') * 1)
					.attr('y', highg.attr('y') * 1)
					.style('width', '240px')
					.style('height', '70px')
					.style('fill', 'rgba(242,242,242,0.5)')
					.attr('stroke', 'rgb(21,193,156)')
					.attr('stroke-width', '1')

				highg
					.append('image')
					.style('position', 'absolute')
					.style('height', '20px')
					.style('width', '20px')
					.attr('x', highg.attr('x') * 1 + 220 + 'px')
					.attr('y', highg.attr('y') * 1 + 2 + 'px')
					.attr('xlink:href', 'image/delete.svg')
					.style('cursor', 'pointer')
					.on('mousedown', function () {
						positionselectionhigh = -1
						d3.selectAll('.carpoint').remove()
						positionselection = []
						repaint_map_positionselection()
					})

				highg
					.append('text')
					.attr('class', 'carpoint')
					.text('A point on person Trajectory')
					.style('pointer-events', 'all')
					.attr('x', highg.attr('x') * 1 + 10)
					.attr('y', highg.attr('y') * 1 + 20)
					.style('fill', '#000')
					.style('cursor', 'default')
					.style('font-size', '14px')
					.attr('count', d3.select(this).attr('count'))

				highg
					.append('text')
					.attr('class', 'carpoint')
					.text(
						'Time:   ' +
							parseInt(
								positionselection[d3.select(this).attr('count')]
									.data.time / 100
							) +
							' : ' +
							parseInt(
								positionselection[d3.select(this).attr('count')]
									.data.time % 100
							)
					)
					.attr('x', highg.attr('x') * 1 + 10)
					.attr('y', highg.attr('y') * 1 + 40)
					.style('pointer-events', 'all')
					.style('fill', '#15c19c')
					.style('cursor', 'pointer')
					.style('font-size', '14px')
					.attr('count', d3.select(this).attr('count'))
					.on('mousedown', function () {
						var data =
							positionselection[d3.select(this).attr('count')]
						data.data.time =
							parseInt(
								positionselection[d3.select(this).attr('count')]
									.data.time / 100
							) *
								60 +
							parseInt(
								positionselection[d3.select(this).attr('count')]
									.data.time % 100
							)
						console.log(data.data)
						new_conditiondiv(
							'timepoint',
							data.data,
							d3.event.x,
							d3.event.y,
							data.nodecount,
							1
						)
					})

				highg
					.append('text')
					.attr('class', 'carpoint')
					.text('Extract Position')
					.style('pointer-events', 'all')
					.attr('x', highg.attr('x') * 1 + 10)
					.attr('y', highg.attr('y') * 1 + 60)
					.style('cursor', 'pointer')
					.style('fill', '#15c19c')
					.style('font-size', '14px')
					.attr('count', d3.select(this).attr('count'))
					.on('mousedown', function () {
						var data =
							positionselection[d3.select(this).attr('count')]
						var latlon = [data.data.lat, data.data.lon]
						new_conditiondiv(
							'positionpoint',
							{ lat: latlon[0], lon: latlon[1] },
							d3.event.x,
							d3.event.y,
							data.nodecount,
							1
						)
					})
			})
			.on('mouseover', function () {
				d3.select(this).attr('xlink:href', 'image/map_objlist_car.svg')
			})
			.on('mouseout', function () {
				if (d3.select(this).attr('show') == 'false')
					d3.select(this).attr(
						'xlink:href',
						'image/map_objlist_carempl.svg'
					)
			})
	}
}
