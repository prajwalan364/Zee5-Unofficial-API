# ZEE5 Unofficial API

### Prerequisites

- nodejs

## Installation

```
npm install
```

### Start the Server

```
npm start
```

Usage

## API END POINT(GET REQUEST)

### Paste zee5 Movie or Shows Link

```
http://localhost:3000/media?url=https://www.zee5.com/movies/details/mugulu-nage/0-0-mugulunage
```

### RESULT

```
{
  "mediaData": {
    "id": "0-0-mugulunage",
    "title": "Mugulu Nage",
    "duration": "149 Min",
    "description": "Mugulu Nage is a 2017 Kannada romantic comedy film starring Ganesh, Apoorva Arora, Nikitha Narayan and Ashika Ranganath in the lead roles. The story is about Pulkesh who has never cried since his birth. His life takes an interesting turn as he falls in love and faces a heartbreak.",
    "downloadUrl": "https://zee5vodnd.akamaized.net/hls/PRIORITY1080/KANNADA_MOVIES/Mugulunage_Kannada_Movie_Revised.mp4/index.m3u8?hdnea=st=1606367695~exp=1606370695~acl=/*~hmac=9d68b973270e2654736b678cccba63f86a469a9b6dfb9ac0dd6ded3926d6a1c9"
  }
}
```

### you can use youtube-dl or ffmpeg to Download

## Issues

- Shows which is not Premiered in Televison will not work
