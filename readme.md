

### 搜索
 - https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=简单爱

### 封面 
 - http://imgcache.qq.com/music/photo/album_300/[albumid%100]/300_albumpic_[albumid]_0.jpg, albumid%100, albumid
 - 比如albumid=8217，封面地址就是
 - http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8217_0.jpg。

### 歌曲token 
 - https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=003lghpv0jfFXG&filename=C400003lghpv0jfFXG.m4a&guid=126548448

1. songmid可以从歌曲信息中取到，filename根据songmid生成。
2. 比如，songmid是003lghpv0jfFXG，则filename就是前缀加上C400，后缀加上.m4a，即C400003lghpv0jfFXG.m4a。
3. 其他字段format、platform、cid、guid可以写死，但都是必须的。

### 拼接播放地址
 - http://ws.stream.qqmusic.qq.com/C400003lghpv0jfFXG.m4a?fromtag=0&guid=126548448&vkey=D661E5DF19B8FEB2FBFC554276746AC608AE98B0F30595B3B3BAD5C1C89ECCDD7BE599E306F786621856D22D6BD6B96F5DD344CF3814DB71

[原文依据](https://www.jianshu.com/p/67e4bd47d981)


本项目封装Api

### 音乐列表

#### list

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| p | string  | 页码| 
| n | string  | 数目| 
| w | string  | 关键词 |


返回参数

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| curpage | int  | 页码| 
| curnum | int  | 数目| 
| list |  ---  | 音乐列表 |

eg：

```
    http://39.105.8.100:8001/list?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=简单爱
```

返回参数举例

```
    {
    "curnum": 41,
    "curpage": 1,
    "list": [
        {
            "songname": "简单爱",
            "singer": {
                "id": 4558,
                "mid": "0025NhlN2yWrP4",
                "name": "周杰伦",
                "name_hilight": "周杰伦"
            },
            "albumname": "范特西",
            "songmid": "0009BCJK1nRaad",
            "albumimg": "http://imgcache.qq.com/music/photo/album_300/17300_albumpic_8217_0.jpg"
        },
        {
            "songname": "简单爱 (Live)",
            "singer": {
                "id": 4558,
                "mid": "0025NhlN2yWrP4",
                "name": "周杰伦",
                "name_hilight": "周杰伦"
            },
            "albumname": "周杰伦 2004 无与伦比 演唱会 Live CD",
            "songmid": "0022nw6P1dcHgp",
            "albumimg": "http://imgcache.qq.com/music/photo/album_300/23300_albumpic_14323_0.jpg"
        },
        {
            "songname": "简单爱 (Live)",
            "singer": {
                "id": 143,
                "mid": "003Nz2So3XXYek",
                "name": "陈奕迅",
                "name_hilight": "陈奕迅"
            },
            "albumname": "2015江苏卫视新年演唱会",
            "songmid": "001IcyF42TKTf1",
            "albumimg": "http://imgcache.qq.com/music/photo/album_300/53300_albumpic_929853_0.jpg"
        }
    ]
}
```

### 音乐播放地址

#### music


| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| songmid | string  | 用于获取token | 
| guid | string  | 用于获取token| 

其他参数固定

返回参数

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| musicUrl | string  | 音乐播放地址| 


eg:

```
    39.105.8.100:8001/music?songmid=003lghpv0jfFXG&guid=126548448
```

返回参数举例

```
    {
    "code": "0",
    "data": {
        "musicUrl": "http://ws.stream.qqmusic.qq.com/C400003lghpv0jfFXG.m4a?fromtag=0&guid=126548448&vkey=7888A32FC10168AAD914CA484401762D7F060E7337C0B9187D8B907681BB177669ADB3DFBF398E0FC4D6ED1E0EC7574716872D7B5FE14322"
    }
}

```
