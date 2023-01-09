
# 运行

```
    npm install

    node index.js
```

#### 2023/01/09
1. 服务器已经到期了，目前项目的测试API是无法使用的。需要测试的话可能得自己起一个服务了。

#### 2020/6/03

1. 接口已恢复。感谢[蒟蒻...](https://blog.csdn.net/weixin_44159306)的帮助, 才能这么快解决这个问题。有兴趣可以查看他的关于sign获取的[文章](https://blog.csdn.net/weixin_44159306/article/details/106292092)
2. 之前分出了ts的分支，主要开始维护ts分支，master可能会更新的晚一点，如果需要自己启服务的话可以下载ts分支，有问题也可以回复，我可以协助一下。

#### 2020/5/27

1. 发现获取vkey的接口现在获取不到了，应该是官方换了请求方式，目前播放地址受到了影响，无法播放，修复时间待定。

#### 2020/5/7

1. 之前要使用api的话只能通过服务端请求，嗯嗯..想了想，现在支持跨域了。还是仅测试使用，服务器太渣渣。。经不起造。

#### 2020/2/25

1. 最近在做新的项目，叫小鱼干APP，可以在百度，vivo，小米，apple store 中下载，暂时没有时间来搞这个音乐api的东西了，不过服务没有停，如果想用来测试或者玩玩的还是可以用的。


#### 2019/12/26 更新

1. 获取歌曲播放地址接口 增加 lyric参数代表是否获取歌词。
2. 增加获取歌词接口


#### 2019/12/24 更新

1. 所有音乐接口更改，增加一层music/ ，获取地址改为 music/song
2. 增加福利图片接口
3. 示例接口更改为https

> 接口仅供交流学习使用

[github 项目地址](https://github.com/lunhui1994/node-music-api)   希望大家给个star 以支撑我初期坚持不懈的动力。

因为之前使用网络上别人封装的音乐api现在无法使用，或者一些需要付费使用，当然这也无可厚非。

但对我而言，只需要简单的一些音乐api做一些东西。 感觉给钱有点亏。 就自己搞一个简单的符合我的需求的吧。

# 文档

<!-- more -->

## 所支持的Api

1. 音乐搜索
2. 音乐top100列表
3. 音乐播放地址
4. 福利图片 (新增 2019/12/24).
5. 音乐歌词 (新增 2019/12/26).

很简单的三个基本的功能。

所有方法都是GET

本项目所支持的Api

## 一、音乐 music

### 1、音乐列表

#### list 

`GET`

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| p | string  | 页码| 
| n | string  | 数目| 
| w | string  | 关键词 |


返回参数

| 上级  | 参数   |  类型  |  描述 |
| --- | ---   |  ---  | ---   |
| --- | curpage | int  | 页码| 
| --- | curnum | int  | 数目| 
| --- | list |  array [ object ] | 音乐列表 |
| list > {} |  songname  | string    | 歌曲名 |
| list > {} |  songname   | string    | 歌曲名 |
| list > {} |  albumname | string    | 专辑名 |
| list > {} |  songmid  | string    | 歌曲id，用来请求播放地址 |
| list > {} |  albumimg | string    | 封面图 |
| list > {} |  singer  | object| 歌手信息 |
| list > {} > singer |  id | int | 歌手id |
|  list > {} > singer|  name | string    | 歌手名称 |
eg：

```json
    https://api.zsfmyz.top/music/list?p=1&n=30&w=蔡徐坤
```

返回参数举例

```json
    {
    "code": "0",
    "data": {
        "curnum": 30,
        "curpage": 1,
        "list": [
            {
                "songname": "情人",
                "singer": {
                    "id": 1016794,
                    "mid": "002nXp292LIOGV",
                    "name": "蔡徐坤",
                    "name_hilight": "<em>蔡徐坤</em>"
                },
                "albumname": "情人",
                "songmid": "000aWBBQ2fMyBJ",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/88/300_albumpic_12583588_0.jpg"
            },
            {
                "songname": "YOUNG",
                "singer": {
                    "id": 1016794,
                    "mid": "002nXp292LIOGV",
                    "name": "蔡徐坤",
                    "name_hilight": "<em>蔡徐坤</em>"
                },
                "albumname": "YOUNG",
                "songmid": "004BxrBT3coQnC",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/78/300_albumpic_7156278_0.jpg"
            },
            {
                "songname": "Wait Wait Wait",
                "singer": {
                    "id": 1016794,
                    "mid": "002nXp292LIOGV",
                    "name": "蔡徐坤",
                    "name_hilight": "<em>蔡徐坤</em>"
                },
                "albumname": "Wait Wait Wait",
                "songmid": "002kRCBE4dfcU2",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/19/300_albumpic_4359819_0.jpg"
            },
        //  .....
        ]
    }
}
```

### 2、音乐top100列表

#### top
`GET`

参数

无


返回参数

| 上级 | 参数   |  类型  |  描述 |
| --- | ---   |  ---  | ---   |
| --- | date | string  | 日期| 
| --- | curpage | int  | 页码| 
| --- | curnum | int  | 数目| 
| --- | list |  ---  | 音乐列表 |
| --- | list |  array [ object ] | 音乐列表 |
| list > {} |  songname  | string    | 歌曲名 |
| list > {} |  songname   | string    | 歌曲名 |
| list > {} |  albumname | string    | 专辑名 |
| list > {} |  songmid  | string    | 歌曲id，用来请求播放地址 |
| list > {} |  albumimg | string    | 封面图 |
| list > {} |  singer  | object| 歌手信息 |
| list > {} > singer |  id | int | 歌手id |
|  list > {} > singer|  name | string    | 歌手名称 |
| --- | topinfo |  ---  | 音乐top100信息 |

list中歌曲信息比普通列表多了排名: cur_count



eg：

```json
    https://api.zsfmyz.top/music/top
```

返回参数举例

```json
    {
    "code": "0",
    "data": {
        "code": 0,
        "date": "2019-12-05",
        "curnum": 100,
        "curpage": 1,
        "list": [
            {
                "cur_count": "1",
                "songname": "像极了",
                "singer": {
                    "id": 1441799,
                    "mid": "0023dQD40to8NP",
                    "name": "永彬Ryan.B"
                },
                "albumname": "像极了",
                "songmid": "000V8En93R3Dvd",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/36300_albumpic_9218636_0.jpg"
            },
            {
                "cur_count": "2",
                "songname": "拱手相让",
                "singer": {
                    "id": 22529,
                    "mid": "001z6uGh1j5qBh",
                    "name": "胜屿"
                },
                "albumname": "拱手相让",
                "songmid": "002DIlMZ48qB1F",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/66300_albumpic_9414066_0.jpg"
            },
            {
                "cur_count": "3",
                "songname": "余年",
                "singer": {
                    "id": 1060985,
                    "mid": "0022eAG537I1bg",
                    "name": "肖战"
                },
                "albumname": "余年",
                "songmid": "000bFWrY2VrdVp",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/92300_albumpic_9423892_0.jpg"
            },
            {
                "cur_count": "4",
                "songname": "触不可及",
                "singer": {
                    "id": 199509,
                    "mid": "003fA5G40k6hKc",
                    "name": "周深"
                },
                "albumname": "触不可及",
                "songmid": "002EFRnf3ekI9S",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/4300_albumpic_9320604_0.jpg"
            },
            {
                "cur_count": "5",
                "songname": "冷静和热情之间",
                "singer": {
                    "id": 198135,
                    "mid": "001IoTZp19YMDG",
                    "name": "易烊千玺"
                },
                "albumname": "冷静和热情之间",
                "songmid": "0014YYnw3vadJJ",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/59300_albumpic_9415259_0.jpg"
            },
            {
                "cur_count": "6",
                "songname": "美丽谎言",
                "singer": {
                    "id": 71976,
                    "mid": "001gthIA2JeIV1",
                    "name": "都智文"
                },
                "albumname": "美丽谎言",
                "songmid": "003sJCeZ1iK9mZ",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/88300_albumpic_9353488_0.jpg"
            },
            {
                "cur_count": "7",
                "songname": "那男孩还好吗",
                "singer": {
                    "id": 3298773,
                    "mid": "003yGiqM2qF7Gm",
                    "name": "Uu"
                },
                "albumname": "那男孩还好吗",
                "songmid": "002COmzJ0SPZMl",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/36300_albumpic_9132036_0.jpg"
            },
            {
                "cur_count": "8",
                "songname": "星辰大海",
                "singer": {
                    "id": 25724,
                    "mid": "0044vhyY2lfSB8",
                    "name": "周冬雨"
                },
                "albumname": "星辰大海",
                "songmid": "003enTsq4M1J59",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/63300_albumpic_9305663_0.jpg"
            },
            {
                "cur_count": "9",
                "songname": "Lover (Remix)",
                "singer": {
                    "id": 11921,
                    "mid": "000qrPik2w6lDr",
                    "name": "Taylor Swift"
                },
                "albumname": "Lover (Remix)",
                "songmid": "000H6p9p0V4MXi",
                "albumimg": "http://imgcache.qq.com/music/photo/album_300/58300_albumpic_9207358_0.jpg"
            },
        ],
        "topinfo": {
            "ListName": "巅峰榜·新歌",
            "MacDetailPicUrl": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172435.jpg",
            "MacListPicUrl": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172427.jpg",
            "UpdateType": "1",
            "albuminfo": "",
            "headPic_v12": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820174934.jpg",
            "info": "集结30天内发行的优质歌曲，鼓励原创、着眼未来的乐坛风向标。根据每日综合数据进行排序，体现QQ音乐用户追新潮流，致力于打造最权威最有公信力的专业健康的新歌排行榜。<br><br>歌曲数量：100首<br>综合数据：登录用户在QQ音乐收听/分享/下载数据",
            "listennum": 1497166,
            "pic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172421.jpg",
            "picDetail": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172414.jpg",
            "pic_album": "http://imgcache.qq.com/music/photo_new/T002R300x300M000000tSk703NJAVD.jpg",
            "pic_h5": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172242.jpg",
            "pic_v11": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172421.jpg",
            "pic_v12": "http://y.gtimg.cn/music/photo_new/T003R300x300M000003zALCN1hkB6y.jpg",
            "topID": "27",
            "type": "0"
        }
    }
}
```

### 3、音乐播放地址

#### song
`GET`


| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| songmid | string  | 用于获取token | 
| guid | string  | 用于获取token| 
| lyric | string  | 默认为0不获取歌词，1获取歌词 | 

其他参数固定

返回参数

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| musicUrl | string  | 音乐播放地址| 


eg:

```json
    https://api.zsfmyz.top/music/song?songmid=000aWBBQ2fMyBJ&guid=126548448
```

返回参数举例

```json
    {
    "code": "0",
    "data": {
        "musicUrl": "https://ws.stream.qqmusic.qq.com/C400000aWBBQ2fMyBJ.m4a?guid=126548448&vkey=AD7592245F651C2509E1C9B94E3A234B039967023066203214278A71E9DE4E6F3972EA83BB52F80EE74218B39305B6EAC9B0F6A610B0F947&uin=0&fromtag=66",
        "lyric": "无"
    }
}

```

### 4、音乐歌词

#### lyric

`GET`

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| songmid | string  | 用于获取歌词 | 

其他参数固定

返回参数

| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| lyric | string  | 歌词内容| 


eg:

```json
    https://api.zsfmyz.top/music/lyric?songmid=000wocYU11tSzS
```

返回参数举例

```json
    {
    "code": "0",
    "data": {
        "lyric": "[ti:差不多姑娘]\n[ar:G.E.M. 邓紫棋]\n[al:差不多姑娘]\n[by:]\n[offset:0]\n[00:00.00]差不多姑娘 - G.E.M. 邓紫棋\n[00:00.17]\n[00:02.67]差不多的姑娘\n[00:06.27]追逐差不多的漂亮\n[00:11.88]她们差不多的愿望\n[00:17.18]牵着她们鼻子方向\n[00:23.05]我回到差不多的家\n[00:24.38]躺在差不多的沙发\n[00:25.68]微博差不多的刷\n[00:26.99]都吃着差不多的瓜\n[00:28.48]那标题差不多的炸\n[00:29.78]...",
        }
    }
}

```

------


## 福利图片 welfare

> 根据每日福利社的接口进行了封装，因为他们的https失效了，所以自己反向代理了。

## 图片列表

#### list


| 参数   |  类型  |  描述 |
| ---    |  ---   | ---   |
| per_page | string  | 每页数据量 | 
| page | string  | 第几页| 

其他参数固定

返回参数

如下：


eg:

```
    https://api.zsfmyz.top/welfare/list?per_page=20&page=2
```

返回参数举例

```
{
    "code": 0,
    "data": {
        "error": false,
        "results": [
            {
                "_id": "5b63cd4e9d21225e0d3f58c9",
                "createdAt": "2018-08-03T11:34:38.672Z",
                "desc": "2018-08-03", //描述 
                "publishedAt": "2018-08-03T00:00:00.0Z",
                "source": "api",
                "type": "福利", // 类型
                "url": "https://ww1.sinaimg.cn/large/0065oQSqgy1ftwcw4f4a5j30sg10j1g9.jpg", //图片地址
                "used": true,
                "who": "lijinshan"
            },
            {
                "_id": "5b6151509d21225206860f08",
                "createdAt": "2018-08-01T14:21:04.556Z",
                "desc": "2018-08-01",
                "publishedAt": "2018-08-01T00:00:00.0Z",
                "source": "api",
                "type": "福利",
                "url": "https://ww1.sinaimg.cn/large/0065oQSqly1ftu6gl83ewj30k80tites.jpg",
                "used": true,
                "who": "lijinshan"
            },
            // ...
        ]
    }
}

```




# 说明

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

