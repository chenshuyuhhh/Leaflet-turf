function initDemoMap() {
  // 底图1
  var Esri_WorldImagery = L.tileLayer(
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, " +
        "AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );

  // 底图2
  var Esri_DarkGreyCanvas = L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/" +
    "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    "{z}/{x}/{y}.png",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, " +
        "NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
    }
  );

  // 地图层更换，为了简便在此只保留卫星地图
  var baseLayers = {
    "Satellite": Esri_WorldImagery, // 地图名：底图1
    "Grey Canvas": Esri_DarkGreyCanvas // 地图名：底图2
  };

  // map 成员变量，初始为卫星地图
  var map = L.map("map", {
    layers: [Esri_WorldImagery]
  });

  // 控制层，baselayers为底图更换， addTo 将 control 和 map 绑定
  var layerControl = L.control.layers(baseLayers).addTo(map);
  // 初始化map定位
  map.setView([34, 105], 4.6);

  return {
    map: map,
    layerControl: layerControl
  };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map; // 获取地图
var layerControl = mapStuff.layerControl; // 获取 control

//创建等值线区域
// var extent = [40, 60, 90, 70];
// var cellSide = 100;
// var pointGrid = isoline.pointGrid(extent, cellSide, { units: 'miles' });

// for (var i = 0; i < pointGrid.features.length; i++) {
//   pointGrid.features[i].properties.temperature = Math.random() * 10;
// }


//等值线的级数
var isoline_breaks = [0, 2, 4, 6, 8];

//设置颜色
var isoline_style = {
  "color": "#2b6dab",
  "weight": 2,
  "opacity": 0.4
};
var isoline_icon1 = L.icon({
  iconUrl: 'resource/1.png',
  iconSize: [14, 14]
});
var isoline_icon2 = L.icon({
  iconUrl: 'resource/2.png',
  iconSize: [14, 14]
});
var isoline_icon3 = L.icon({
  iconUrl: 'resource/3.png',
  iconSize: [14, 14]
});
var isoline_icon4 = L.icon({
  iconUrl: 'resource/4.png',
  iconSize: [14, 14]
});
var isoline_icons = [isoline_icon1, isoline_icon2, isoline_icon3, isoline_icon4]
var isoline_cfg = {
  style: isoline_style,
  nums: isoline_breaks.length,
  breaks: isoline_breaks,
  icons: isoline_icons,
}

var isoline_layer = new IsolineOverlay(isoline_cfg);
layerControl.addOverlay(isoline_layer, '等压线');
// 加入数据
isoline_layer.setData(pointGrid);