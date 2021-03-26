/**
 * Created by Administrator on 2016/3/23.
 */
function showobjectlist_car(obj) {
	obj.showcharttype = 'Speed'
	var thiscardiv = d3
		.select('#map_objectlistdiv')
		.append('div')
		.attr('class', 'map_objectlist_obj')
		.attr('type', obj.type)
		.attr('carid', obj.data.ID)
		.attr('id', 'objlistcardiv' + obj.data.ID)
		.on('mousemove', function () {
			if (obj.ismove == 0) {
				obj.ismove = map_highlightzindex
				repaint_map_object()
				d3.selectAll('.cartraj').style('opacity', '0.1')
				d3.selectAll('#car_traj' + obj.data.ID)
					.transition()
					.ease('linear')
					.duration(300)
					.delay(0)
					.style('opacity', '1')
			}
		})
		.on('mouseout', function () {
			obj.ismove = 0
			repaint_map_object()
		})
		.on('mouseup', function () {
			if (obj.highlight == 0) {
				obj.highlight = map_highlightzindex
				map_highlightzindex++
			} else {
				for (var i = 0; i < map_object.length; i++) {
					if (map_object[i].highlight > obj.highlight) {
						map_object[i].highlight--
					}
				}
				obj.highlight = 0
			}
			highlightrepaint_map_object()
		})

	thiscardiv
		.append('div')
		.text(obj.data.ID.replace('浙', ''))
		.style('pointer-events', 'none')
		.attr('class', 'listobjid')
	thiscardiv
		.append('img')
		.attr('src', 'image/map_objlist_car.svg')
		.attr('height', '30px')
		.attr('width', '30px')
		.style('pointer-events', 'none')
		.style('position', 'absolute')
		.style('left', '0px')
		.style('top', '33px')

	thiscardiv
		.append('div')
		.style('background', 'url(image/delete.svg) no-repeat')
		.style('background-size', '100% 100%')
		.style('position', 'absolute')
		.style('left', '222px')
		.style('top', '41px')
		.style('width', '16px')
		.style('height', '16px')
		.style('cursor', 'pointer')
		.attr('carid', obj.data.ID)
		.on('mouseup', function () {
			console.log(d3.select(this).attr('carid'))
			var temp = []
			for (var i = 0; i < map_object.length; i++) {
				if (map_object[i].type == 'car') {
					console.log(map_object[i].id)
					if (map_object[i].id != d3.select(this).attr('carid')) {
						temp.push(map_object[i])
					}
				} else {
					temp.push(map_object[i])
				}
			}
			map_object = temp
			repaint_map_object()
			if (map_object.length == 0) {
				delete_map_object_listdiv()
			}
			d3.select('#objlistcardiv' + d3.select(this).attr('carid')).remove()
		})

	// var speed = 0,
	// 	passageintime = 0,
	// 	runningtime = 1
	// for (var i = 0; i < obj.data.texiInfo.length; i++) {
	// 	if (obj.data.texiInfo[i].speed > 0) {
	// 		runningtime++
	// 		speed = speed + obj.data.texiInfo[i].speed
	// 	}
	// 	if (obj.data.texiInfo[i].isPassengerIn == 1) {
	// 		passageintime++
	// 	}
	// }
	// speed = speed / runningtime
	// var attrdiv = thiscardiv
	// 	.append('div')
	// 	.attr('class', 'attr')
	// 	.style('pointer-events', 'none')
	// attrdiv
	// 	.append('div')
	// 	.style('pointer-events', 'none')
	// 	.text('speed: ' + parseInt(speed) + 'km/h')
	// attrdiv
	// 	.append('div')
	// 	.style('pointer-events', 'none')
	// 	.text(
	// 		'Riding duration  :   ' +
	// 			parseInt(runningtime / 120) +
	// 			'h' +
	// 			parseInt((runningtime / 2) % 60) +
	// 			'min'
	// 	)
	// attrdiv
	// 	.append('div')
	// 	.style('pointer-events', 'none')
	// 	.text(
	// 		'Duration with passengers:   ' +
	// 			parseInt(passageintime / 120) +
	// 			'h' +
	// 			parseInt((passageintime / 2) % 60) +
	// 			'min'
	// )
}

function showobjectlist_carlist(obj) {
	console.log(obj)
	obj.showcharttype = 'Speed'
	var thiscarlistdiv = d3
		.select('#map_objectlistdiv')
		.append('div')
		.attr('class', 'map_objectlist_obj')
		.attr('type', obj.type)
		.style('height', '47px')
		.attr('carname', obj.id)
		.style('height', '')
		.attr('id', 'objlistcarlistdiv' + obj.id)
		.on('mousemove', function () {
			if (obj.ismove == 0) {
				obj.ismove = map_highlightzindex
				repaint_map_object()
				d3.selectAll('.cartraj').style('opacity', '0.01')
				d3.selectAll('#carlist_traj' + obj.id)
					.transition()
					.ease('linear')
					.duration(300)
					.delay(100)
					.style(
						'opacity',
						d3.select('#carlist_traj' + obj.id).attr('opacity')
					)
			}
		})
		.on('mouseout', function () {
			obj.ismove = 0
			repaint_map_object()
		})
		.on('mouseup', function () {
			if (obj.highlight == 0) {
				obj.highlight = map_highlightzindex
				map_highlightzindex++
			} else {
				for (var i = 0; i < map_object.length; i++) {
					if (map_object[i].highlight > obj.highlight) {
						map_object[i].highlight--
					}
				}
				obj.highlight = 0
			}
			highlightrepaint_map_object()
		})

	thiscarlistdiv
		.append('img')
		.style('pointer-events', 'none')
		.attr('src', 'image/map_objlist_car.svg')
		.attr('height', '30px')
		.attr('width', '30px')
		.style('position', 'absolute')
		.style('left', '0')
		.style('top', '7px')

	thiscarlistdiv
		.append('div')
		.style('pointer-events', 'none')
		.text(obj.id)
		.style('height', '40px')
		.attr('class', 'listobjid')
		.style('font-size', '13px')

	thiscarlistdiv
		.append('img')
		.attr('src', 'image/delete.svg')
		.style('position', 'absolute')
		.style('cursor', 'pointer')
		.style('left', '222px')
		.style('width', '16px')
		.style('height', '16px')
		.style('top', '13px')
		.attr('thisid', obj.id)
		.on('mouseup', function () {
			var temp = []
			for (var i = 0; i < map_object.length; i++) {
				if (map_object[i].id != d3.select(this).attr('thisid')) {
					temp.push(map_object[i])
				}
			}
			map_object = temp
			repaint_map_object()
			if (map_object.length == 0) {
				delete_map_object_listdiv()
			}
			d3.select(
				'#objlistcarlistdiv' + d3.select(this).attr('thisid')
			).remove()
		})
	//?????????
	var attrdiv = thiscarlistdiv
		.append('div')
		.style('pointer-events', 'none')
		.attr('class', 'attr')
		.style('position', 'absolute')
		.style('top', '17px')
	attrdiv
		.append('div')
		.style('pointer-events', 'none')
		.text('number : ' + obj.data.length)
	//attrdiv.append("div").text("time:   "+parseInt(obj.data.time/60)+" : "+parseInt((obj.data.time)%60))
}
