//侧边栏
module.exports = {
    '/views/': [
        '',
        {
            title: 'AI及机器人等',
            collapsable: true,
            children: [
                'AI/detection.md', 'AI/aione.md',
                'AI/2020baidustar.md', 'AI/TextClassification.md', 'AI/taac2021.md',
                'AI/tengine/ohosndk0.md',
                'AI/mmlab/mmpose/00.md',
                'AI/ros/env.md','AI/ros/note00.md',


            ]
        },
        {
            title: '算法等',
            collapsable: true,
            children: [
                'algorithm/opencv/clahe.md', 'algorithm/opencv/ImageProcessing.md', 'algorithm/opencv/otsu.md', 'algorithm/opencv/retinex.md',
                'algorithm/opencv/env.md',
                'algorithm/slam/n0.md',
                'algorithm/leetcode1.md',


            ]
        },
        {
            title: '计算机技术等',
            collapsable: true,
            children: [
                'cs/yolov4.md', 'cs/photo.md', 'cs/guiYolov4.md', 'cs/Imagesegmentation.md', 'cs/MFCbmp.md',
                'cs/vueblog.md',
                'cs/OS/GlimmerOS.md',
                'cs/android/mina.md',
                'cs/python/note0.md',
            ]
        },
        {
            title: '硬件设计等',
            collapsable: true,
            children: [
                'ee/cubli.md', 'ee/tinyascen.md', 'ee/star.md', 'ee/midbot.md', 'ee/smallB.md', 'ee/miniBOT.md',
                'ee/uvc.md',
                'ee/harmonyos/ohos0.md',
                'ee/tcostiny/tcos0.md',
                'ee/ARMcortex/nanopi0.md', 'ee/ARMcortex/armenv.md',
                'ee/riscv/gdf103.md',
                'ee/fpga/env.md',
                'ee/cxv/start.md',


            ]
        },
        {
            title: '杂谈',
            collapsable: true,
            children: [
                'freetalk/why', 'freetalk/wsl.md', 'freetalk/color.md', 'freetalk/Fourier.md', 'freetalk/android.md',
                'freetalk/ip0.md', 'freetalk/picgo.md', 'freetalk/docker00.md','freetalk/self_improvement.md',
                'freetalk/cicd/fix.md',
                'freetalk/spider/github.md','freetalk/spider/zhihu.md',
                'freetalk/vsc/tools.md',



            ]
        },
        {
            title: '小游戏设计等',
            collapsable: true,
            children: [
                'game/16.md',
                'game/vulkan/note0.md',
                'game/unity/AR.md',

            ]
        },
        {
            title: '笔记等',
            collapsable: true,
            children: [
                'notes/Googlebug.md', 'notes/Pythonbug.md', 'notes/aibug00.md', 'notes/linuxbug00.md', 'notes/git.md',
                'notes/oamnote.md', 'notes/vim.md', 'notes/Edge.md', 'notes/markdown.md','notes/pypi.md',
                'notes/linux.md','notes/opencvbug.md','notes/pycocotools.md',

            ]
        },


    ]
}