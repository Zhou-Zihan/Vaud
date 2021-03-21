/**
 * Created by Administrator on 2016/2/22.
 */

var map_object = []
var map_highlightzindex = 1
var flag_is_textmouseup = false

var positionselection = []
var positionselectionhigh = -1

map.on('zoomstart', function () {
	$('#mapobjectsvg').hide()
	clean_mapobject()
	clean_maphighlightobject()
})
map.on('movestart', function () {
	$('#mapobjectsvg').hide()
	clean_mapobject()
	clean_maphighlightobject()
})
map.on('moveend', function () {
	repaint_map_object()
	highlightrepaint_map_object()
	repaint_map_carpositionselection()
	repaint_map_peoplepositionselection()
})
map.on('viewreset', function () {
	repaint_map_object()
	highlightrepaint_map_object()
	repaint_map_carpositionselection()
	repaint_map_peoplepositionselection()
})

function repaint_map_object() {
	clean_mapobject()
	for (var i = 0; i < map_object.length; i++) {
		if (map_object[i].show) {
			if (map_object[i].type == 'car') {
				paint_cartraj(map_object[i])
			}
			if (map_object[i].type == 'blog') {
				paint_blogtraj(map_object[i])
			}
			if (map_object[i].type == 'bloglist') {
				paint_bloglisttraj(map_object[i])
			}
			if (map_object[i].type == 'carlist') {
				paint_carlisttraj(map_object[i])
			}
			if (map_object[i].type == 'poi') {
				paint_poitraj(map_object[i])
			}
			if (map_object[i].type == 'poilist') {
				paint_poilisttraj(map_object[i])
			}
			if (map_object[i].type == 'people') {
				paint_peopletraj(map_object[i])
			}
			if (map_object[i].type == 'peoplelist') {
				paint_peoplelisttraj(map_object[i])
			}
			if (map_object[i].type == 'estate') {
				paint_estatetraj(map_object[i])
			}
			if (map_object[i].type == 'estatelist') {
				paint_estatelisttraj(map_object[i])
			}
			if (map_object[i].type == 'social_network') {
				paint_social_networktraj(map_object[i])
			}
		}
	}
	$('#mapobjectsvg').show()
}

function highlightrepaint_map_object() {
	clean_maphighlightobject()
	for (var i = 0; i < map_object.length; i++) {
		if (map_object[i].show) {
			if (map_object[i].highlight || map_object[i].ismove) {
				switch (map_object[i].type) {
					case 'car': {
						highlightpaint_cartraj(map_object[i])
						break
					}
					case 'blog': {
						highlightpaint_blogtraj(map_object[i])
						break
					}
					case 'carlist': {
						highlightpaint_carlisttraj(map_object[i])
						break
					}
					case 'poi': {
						highlightpaint_poitraj(map_object[i])
						break
					}
					case 'people': {
						highlightpaint_peopletraj(map_object[i])
						break
					}
					case 'peoplelist': {
						highlightpaint_peoplelisttraj(map_object[i])
						break
					}
					case 'estate': {
						highlightpaint_estatetraj(map_object[i])
						break
					}
					case 'social_network': {
						highlightpaint_social_networktraj(map_object[i])
						break
					}
					case 'social_networklist': {
						highlightpaint_social_networklisttraj(map_object[i])
						break
					}
					case 'weather': {
						highlightpaint_weathertraj(map_object[i])
						break
					}
				}
			}
		}
	}
	$('#mapobjectsvg').show()
}

function clean_mapobject() {
	d3.select('#mapobjectsvg').selectAll('.cartraj').remove()
	d3.select('#mapobjectsvg').selectAll('.blogtraj').remove()
	d3.select('#mapobjectsvg').selectAll('.peopletraj').remove()
	d3.select('#mapobjectsvg').selectAll('.poitraj').remove()
	d3.select('#mapobjectsvg').selectAll('.estatetraj').remove()
	d3.select('#mapobjectsvg').selectAll('.social_networktraj').remove()
}
function clean_maphighlightobject() {
	Heatmap_Object.setLatLngs([])
	d3.selectAll('.highlightcar').remove()
	d3.selectAll('.highlightblog').remove()
	d3.selectAll('.highlightpeople').remove()
	d3.selectAll('.mappoppoi').remove()
	d3.selectAll('.mappopsnt').remove()
	d3.selectAll('.mappopestate').remove()

	d3.selectAll('.highlightestate').remove()
	d3.selectAll('.highlightsocial_network').remove()
	d3.selectAll('.highlight_social_networklist').remove()
	// setHeatmap([]);
}

function add_mapobject(type, id, node) {
	//add listdiv
	if (map_object.length == 0) {
		add_map_object_listdiv()
	}

	//if exist
	for (var i = 0; i < map_object.length; i++) {
		if (map_object[i].type == 'car' && map_object[i].id == id) {
			if ((map_object[i].show = false)) {
				map_object[i].show = true
				repaint_map_object()
			}
			return
		}
	}

	if (type == 'car') {
		var thisobject = {
			type: 'car',
			id: id.ID,
			data: id.data,
			show: true,
			highlight: 0,
			ismove: 0,
			node: node,
		}
		map_object.push(thisobject)
		paint_cartraj(thisobject)
		add_map_objectlist_object(thisobject)
	}

	if (type == 'carlist') {
		var data = id
		var thisobject = {
			type: 'carlist',
			id: 'node' + node,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_carlisttraj(thisobject)
		add_map_objectlist_object(thisobject)
	}

	if (type == 'people') {
		//     qm.getMultiWhoTraj(
		//         [id.ID],1000,
		//  function (data) {
		//       console.log(data)
		//         var thisobject = {
		//             type: "people",
		//             id: data[0].ID,
		//             data: data[0],
		//             show: true,
		//             highlight: 0,
		//             ismove: 0,
		//             node: node};
		//         map_object.push(thisobject);
		//         paint_peopletraj(thisobject)
		//         add_map_objectlist_object(thisobject);
		//     })
		//   ;
		var thisobject = {
			type: 'people',
			id: id.ID,
			data: id,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_peopletraj(thisobject)
		add_map_objectlist_object(thisobject)
	}

	if (type == 'peoplelist') {
		console.log(id, node)
		var data = id
		var thisobject = {
			type: 'peoplelist',
			id: 'node' + node,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_peoplelisttraj(thisobject)
		add_map_objectlist_object(thisobject)
	}

	if (type == 'blog') {
		var data = id
		var thisobject = {
			type: 'blog',
			id: data.name,
			data: data,
			show: true,
			highlight: 1,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_blogtraj(thisobject)
		add_map_objectlist_object(thisobject)
		highlightrepaint_map_object()
	}
	if (type == 'bloglist') {
		var data = id
		var thisobject = {
			type: 'bloglist',
			id: 'node' + node,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_bloglisttraj(thisobject)
		add_map_objectlist_object(thisobject)
	}
	if (type == 'social_network') {
		var data = id
		var thisobject = {
			type: 'social_network',
			id: data.otherid,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_social_networktraj(thisobject)
		add_map_objectlist_object(thisobject)
	}
	if (type == 'social_networklist') {
		var data = id
		var thisobject = {
			type: 'social_networklist',
			id: data[0].thisid,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		add_map_objectlist_object(thisobject)
	}

	if (type == 'poi') {
		var data = id
		var thisobject = {
			type: 'poi',
			id: data.area,
			data: data,
			show: true,
			highlight: 1,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_poitraj(thisobject)
		add_map_objectlist_object(thisobject)
		highlightrepaint_map_object()
	}
	if (type == 'poilist') {
		var data = id
		var thisobject = {
			type: 'poilist',
			id: 'node' + node,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_poilisttraj(thisobject)
		add_map_objectlist_object(thisobject)
	}
	if (type == 'estate') {
		var data = id
		var thisobject = {
			type: 'estate',
			id: data.detailname,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_estatetraj(thisobject)
		add_map_objectlist_object(thisobject)
	}
	if (type == 'estatelist') {
		var data = id
		var thisobject = {
			type: 'estatelist',
			id: 'node' + node,
			data: data,
			show: true,
			highlight: 0,
			node: node,
			ismove: 0,
		}
		map_object.push(thisobject)
		paint_estatelisttraj(thisobject)
		add_map_objectlist_object(thisobject)
	}
}

function highlightpaint_street_viewtraj(lon, lat) {
	var street = d3
		.select('#sceneviewfold')
		.append('div')
		.attr('id', 'streetview')
		.style('position', 'absolute')
		.style('height', '100%')
		.style('z-index', '10000')
		.style('width', '100%')
		.style('top', 0)
		.style('left', 0)
	street
		.append('object')
		.style('height', '100%')
		.style('width', '100%')
		.attr(
			'data',
			'http://api.map.baidu.com/pano/?x=' +
				(lon * 1 + 0.011) +
				'&y=' +
				(lat * 1 + 0.002) +
				'&lc=0&ak=898c90ef23b14cc3b755d7a2cb64d150'
		)

	//delete
	street
		.append('object')
		.attr('class', 'highlight_delete')
		.style('position', 'absolute')
		.style('height', '16px')
		.style('width', '16px')
		.style('top', '7px')
		.style('right', '20px')
		.attr('data', 'image/delete.svg')

	street
		.append('div')
		.attr('class', 'highlight_delete')
		.style('filter:alpha', '(opacity=100)')
		.style('cursor', 'pointer')
		.style('position', 'absolute')
		.style('height', '16px')
		.style('width', '16px')
		.style('top', '7px')
		.style('right', '20px')
		.on('mousedown', function () {
			d3.select('#streetview').remove()
		})
}
