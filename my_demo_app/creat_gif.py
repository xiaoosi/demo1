# coding:utf-8

import moviepy.editor as mpy
import os

BASE_SIZE = (500, 300)
DIVISION_SIZE = 0.2


def create_text_clip(string, b_time=0, e_time=0):
    text_clip = mpy.TextClip(string, font=r"Noto-Sans-CJK-SC-Bold",
                             fontsize=16, color="#fff")
    text_clip = text_clip.set_start(b_time).set_end(e_time)
    return text_clip


def create_gif_use_patchs(patchs, file_path):
    base_size = BASE_SIZE
    video_clip = mpy.VideoFileClip(os.path.join(file_path, "gif.gif"))
    video_size = video_clip.size
    print video_size
    clips = [video_clip]
    new_clip = mpy.CompositeVideoClip(clips)
    for patch in patchs:
        left = (patch['left'] * video_size[0]) / base_size[0]
        top = (patch['top'] * video_size[1]) / base_size[1]
        st_time = patch['st_time'] * DIVISION_SIZE
        en_time = patch['en_time'] * DIVISION_SIZE
        clip = create_text_clip(patch['text'].encode('utf-8'), st_time, en_time)
        new_clip = mpy.CompositeVideoClip([new_clip, clip.set_position((left, top))])
        print (top, left)
    print os.path.join(file_path, "out.gif")
    new_clip.write_gif(os.path.join(file_path, "out.gif"))
    return


def division(file_path):
    clip = mpy.VideoFileClip(os.path.join(file_path, "gif.gif"))
    for i in range(int(clip.duration / DIVISION_SIZE)):
        clip.save_frame(os.path.join(file_path, "patch", "{}.jpg".format(i)), i*DIVISION_SIZE)
    return int(clip.duration / DIVISION_SIZE)


if __name__ == '__main__':

    text_patch = {"text": "我肖雨林",
                  "st_time": 0,
                  "en_time": 3,
                  "top": 10,
                  "left": 200
                  }
    text_patch1 = {"text": "就是烦死，死外边，从这跳下去",
                   "st_time": 3,
                   "en_time": 6,
                   "top": 10,
                   "left": 200
                   }
    text_patch2 = {"text": "也不会玩DNF这种辣鸡游戏",
                   "st_time": 6,
                   "en_time": 10,
                   "top": 10,
                   "left": 200
                   }
    text_patch3 = {"text": "真好玩",
                   "st_time": 10,
                   "en_time": 20,
                   "top": 10,
                   "left": 20
                   }

    patchs = []
    patchs.append(text_patch)
    patchs.append(text_patch1)
    patchs.append(text_patch2)
    patchs.append(text_patch3)
    create_gif_use_patchs(patchs, 'gif')

    # image_clip = mpy.ImageClip("gif/0.jpg")
    # text_clip = mpy.TextClip("hahahahah", font=r"Noto-Sans-CJK-JP-Bold",
    #                          fontsize=20, color="#fff")
    # newclip = mpy.CompositeVideoClip([image_clip, text_clip])
    # newclip.save_frame("gif/out.png")





    # text_clip = creat_text_clip_use_patchs(patchs)
    # clip = mpy.VideoFileClip("gif/wjz.gif")
    # text_clip = creat_text_clip("吃屎", e_time=clip.end)
    # text_clip = mpy.TextClip("吃屎", font=r"Noto-Sans-CJK-JP-Bold", fontsize=20, color="#fff")
    # text_clip2 = mpy.TextClip("吃屎粑粑", font=r"Noto-Sans-CJK-JP-Bold", fontsize=20, color="#fff")
    # text_clip = text_clip.set_duration(clip.duration/2)
    # text_clip2 = text_clip2.set_duration(clip.duration/2)
    # text_clip = mpy.concatenate_videoclips([text_clip, text_clip2])
    # new_clip = mpy.CompositeVideoClip([clip, text_clip.set_position("bottom")])
    # new_new_clip = new_clip.fx(mpy.vfx.speedx, 0.5)
    # new_clip.write_gif("gif/test1.gif")
    # for i in range(int(clip.duration / 0.3)):
    #     clip.save_frame("patch/%d.jpg" % i, i * 0.3)