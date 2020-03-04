基于`leaflet` 实现的根据不同等级的数字在地图上标记

#### 参数设置

```javascript
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
......
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
```

#### 图层使用

```javascript
// 图层创建
var isoline_layer = new isolineOverlay(isoline_cfg);
// 将图层加入地图
layerControl.addOverlay(isoline_layer, '等压线');
// 加入数据
isoline_layer.setData(pointGrid);
```

#### 数据格式

等压线采用的是GeoJson数据格式（GeoJSON是一种用于编码各种地理数据结构的格式）

源数据的javascript代码如下，后面会介绍 features 的具体组成结构，这里简化为是一个数组

```javascript
{
    type: "FeatureCollection",
    features:Array
}
```

features 为一个数组，内部有多个点，要给出这个点的经纬度和值的大小

* temperature：数值（气压值）
* coordinates：经纬度


数据的javascript代码如下，具体可参见`等压线数据示范.js`

```javascript
var pointGrid = {
    type: "FeatureCollection",
    features:
        [
            {
                type: "Feature",
                properties: {
                    temperature: 7.258366297764836
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        41.271724902521655,
                        60.65805250568629
                    ]
                }
            },
            {
                type: "Feature",
                properties: {
                    temperature: 9.969102523080144
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        41.271724902521655,
                        62.1053683371242
                    ]
                }
            }
            ...
        ]
}
```
若不能理解上面我所描写的，可以看看有关GeoJson的文档
GeoJson数据格式 ： https://geojson.org
参考文档：https://www.oschina.net/translate/geojson-spec

#### 效果图

下图为等压线效果

![small](https://github.com/chenshuyuhhh/Leaflet-bubbles/blob/master/pic/bubble1.png)



#### 补充说明

##### 目录说明：

src/leaflet-isoline.js：实现上述功能的源代码

demo: 使用leaflet-isoline.js的示范代码

demo/resource/test.js：画图所用的数据

pic：放置效果图

##### 样式修改

如果想修改等级样式可以阅读源代码，主要在_draw函数内部。