"use client"

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";

import SuggestionCard from "./SuggestionCard";
import { useSelector, useDispatch } from "react-redux";
import { selectBlogCardData } from "../Features/Slices/blogCardSlice";
import UserReviewPostsCard from "./UserReviewPostsCard";
import axios from "axios";

// const data = [
//     {
//         id: '17945603372111599',
//         caption: 'We Care What You Care!\n' +
//             '-Innovflor Carpet Tile-\n' +
//             '.\n' +
//             '.\n' +
//             '.\n' +
//             '#carpettiles #carpettile #carpets #floors #carpeting #carpeting #carpet #ayatrio #дизайн #ковроваяплитка #интерпроджект #напольныепокрытия #проекты #профессиональныймонтаж #профполы',
//         like_count: 3,
//         permalink: 'https://www.instagram.com/p/CgLV1Zth_s4/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/294151325_484151693519725_8731802674201985491_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=5EoXekaTefcQ7kNvgGEZbie&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCpPPPYOi75qQYEo9mYZTxNHaKX1Bya8MgehmtWDPy0aA&oe=665C1596',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17971020652450313',
//         caption:
//             'If you’re deep in the process of planning a new kitchen, then get a best Modular Kitchen with best range. A modular kitchen is simply a modern and flexible way to design your kitchen, allowing you to choose a variety of cabinets for different functions which come in “modules.” The modules are available in different sizes which can suit various functions depending on which area of the kitchen you would choose to use the module. They are also available in any number of colours, styles and finishes which can affect the price, but also means that you will be able to find the right style to suit the look and feel you are trying to achieve in your kitchen.\n' +
//             '\n' +
//             '#ayatrio  #modularkitchen',
//         like_count: 121,
//         permalink: 'https://www.instagram.com/p/CVHr9aGF7_J/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/246479756_1012727899298555_9009292283886819372_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_ohc=v669jyguOlUQ7kNvgG1RSOd&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCXjgKBJr9lW76bODCP3nY8amAqXsH5dEgvLeasbzrM7g&oe=665C15F0',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17843836826879502',
//         caption:
//             'Vinyl Flooing are the latest innovation in flooring. Able to imitate real wood, stone, and tile flooring expertly. All while being fully waterproof and extremely durable. It’s these waterproof properties of Vinyl flooring that make it an especially good choice for areas. \n' +
//             'Check out more information about Ayatrio Vinyl flooring solution at https://www.ayatrio.com/products/floor/vinyl/index.html\n' +
//             '\n' +
//             '#ayatrio #flooring #luxuryvinylplank #lvinylflooring  #floordesign #woodenflooring #vinylplank #floortile #flooringdesign #floordesign #flooranddecor #homeimprovment #lvtflooring',
//         like_count: 11,
//         permalink: 'https://www.instagram.com/p/CkuvcAOusMQ/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/315071461_870779870944901_7589119371895902045_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=sx-tESYrajsQ7kNvgFZn-B-&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYA5qIuj56sdHcL_8bJa97wTuCVK2cSAohEwxCo1DnrRJA&oe=665BED3B',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17945779132858423',
//         caption:
//             'We are excited to welcome the AYA Trio to Parker Concert Hall on April 5th! The trio will perform works by Mozart, Schumann, and Arensky. More information at www.brevardmusic.org/pch\n' +
//             '.\n' +
//             '.\n' +
//             '.\n' +
//             '#brevardmusiccenter #brevardmusic #parkerconcerthall #chambermusic #mozart #Schumann #Arensky #ayatrio',
//         like_count: 69,
//         permalink: 'https://www.instagram.com/p/CbaNs6sq3Ah/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/276247762_1650039498682785_6320643155751928400_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=0QvqZhMepHgQ7kNvgEhv3MI&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCO2RbRBUCF5VkvQbevdgRDb3MOyRRQ3kWXtLgD7iLwEg&oe=665C0653',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '18314487469143377',
//         caption:
//             'Engineered Wood Flooring offers the best of both worlds, combining resilience and durability with aesthetic appeal✨. Each multi-layered board is solidly constructed and topped with real wood for a genuinely natural finish. Offering all the durability and easy maintenance you’d find from a quality laminate combined with the look and feel of solid hardwood🪵, it’s easy to see why engineered wood flooring has become an increasingly popular choice for homes. \n' +
//             '\n' +
//             '#ayatrio #retailflooring  #laminateflooring  #floordesign #woodenflooring #floordesign #flooranddecor #homeimprovment #engineeredhardwood #engineeredwoodfloor #hardwoodfloor #flooringideas #homedesignideas #hardwoodfloors #woodfloor #woodfloors #woodflooring #hardwood #floor #homerenovation #interiordesign #interiordesignideas #homedesign #kolkata',
//         like_count: 9,
//         permalink: 'https://www.instagram.com/p/CzvRxuQhecV/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t39.30808-6/401471601_344532004934117_4770076263556727180_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=OVv8Pi-vm-4Q7kNvgHIAkyb&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYAFuta_VeGBaRTIRpAB7ruGhQAsOu1oCtxpdFjl1TCsPw&oe=665C16D9',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17920211594318440',
//         caption:
//             'Wooden flooring is renowned for its longevity and durability. The main advantage of a real wood floor is being able to sand it down and refinish it, prolonging the life of your floor. It’s also completely unique, no two installations of a real wood floor are the same. We have an array of different styles and finishes, so there’s sure to be something to suit you.\n' +
//             '\n' +
//             '#ayatrio #forbetterliving #woodenflooring',
//         like_count: 22,
//         permalink: 'https://www.instagram.com/tv/CeA4ifZD5uL/',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17888669384082635',
//         caption:
//             'We understand that hospitals and healthcare facilities require special flooring needs.\n' +
//             'We design our healthcare flooring solutions, taking into consideration the heavy use, safety, comfort, and infection control requirements of care facilities.\n' +
//             'Ayatrio provides an anti-microbial, durable & hygienic textile floor for waiting areas, offices, corridors & wards.\n' +
//             '\n' +
//             '#ayatrio #hospitalflooring #Healthcareflooring #hospital #Healthcare #AntiBacterialflooring #floor #health #bacteria #antigerm #antibacterial #safe #innovative #love #beauty #architecture #antibacterialflooring #decorative #decor #City #india #kolkata',
//         children: { data: [{ id: '17875663082242397' }, { id: '18218566105033800' }] },
//         like_count: 106,
//         permalink: 'https://www.instagram.com/p/CNMnIvBFv37/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/167665519_723541474986285_8881040981788493336_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=aYcgPmuatHUQ7kNvgFICvCg&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYAFTHADci_0_asJaU8PbZa1Pdo0cdwrXf_r7LKiacl06g&oe=665C003B',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17950042840860079',
//         caption: 'Landscape Design Project\n' +
//             'High Quality, UV engineered Coastal Greenery Vertical Garden Green Wall – Perfect for Terraces, Building Facades, Compound Walls, Balcony Walls, Highlight Walls, Unused Walls, Temporary Green walls Benefits: 1. Practically maintenance-free. No watering or weeds 2. Easily installable on any wall, indoor or outdoor, without the limitations of sunlight or the confines of space 3. Cost-efficient 4. Stays green & luscious for many years 5. Helps your eyes relax - gazing at the color green has been to reduce eye strain.\n' +
//             '\n' +
//             '#ayatrio #artificialgrass #wall #decorative #flooring #ecofriendly #fresh #interior #homedecor',
//         children: {
//             data: [
//                 { id: '17970961501569235' },
//                 { id: '17923961159181620' },
//                 { id: '18157839628216641' },
//                 { id: '17921779697222969' }
//             ]
//         },
//         like_count: 38,
//         permalink: 'https://www.instagram.com/p/Cc7ZcBQOIOo/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/279455252_570470407585828_5725798145606864928_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=bNSyCNcv3I8Q7kNvgGfadLt&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYD5gf9td2u002MW4WcPPDvdTneo4MmeqPWR_KlxEfC4_g&oe=665C1734',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17969547542316992',
//         caption:
//             'Say goodbye to mowing, weeding and fertilising. Artificial grass creates the perfect lawn all year round without the chore of maintenance. Child and pet-friendly, our artificial grass ranges are manufactured from only the highest quality eco-materials; meaning they are free from lead or cadmium.As long as the supporting surface is flat, stable and permeable to water, you can fit the grass virtually anywhere.\n' +
//             '\n' +
//             '#ayatrio #artificialgrass #flooring #ecofriendly #fresh #interior #homedecor #interiordesign #interiordecoration #homedecoration #homestyle #innovative #love #beauty #architecture #decorative #decor #City #india #kolkata',
//         like_count: 16,
//         permalink: 'https://www.instagram.com/p/CoZDI10hMog/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t39.30808-6/329321121_463810269156159_7643822535216785108_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=cQIqmQ1c3W0Q7kNvgFdDoOZ&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCYzKksqvtpzsh8YM9DUG2AUdd9t0KYiXJ5FswwYHMIyw&oe=665C17BC',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17947029496745713',
//         caption:
//             'Wooden Flooring is a true classic that will look elegant, stylish and classy in a traditional decor with complementing furniture. With brown tones and a stunning natural feature, the floor will suit a vast range of color palettes. The brushing process adds durability and texture to the wood, intensifying the grain and creating a striking finish.\n' +
//             'Check out more information about Ayatrio Wooden flooring solution at https://www.ayatrio.com/products/floor/wooden/index.html\n' +
//             '#ayatrio #engineeredhardwood #hardwoodfloor  #floordesign #woodenflooring #floortile #flooringdesign',
//         like_count: 17,
//         permalink: 'https://www.instagram.com/p/Cb9W3eRubf5/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/277853952_127363539876170_5334068994414152569_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=18de74&_nc_ohc=ABGR1ehc_vIQ7kNvgFmDnta&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYA0A6fqCgsA2m6yW47roEEJFTU_Bt506cxeBXllCqUz8Q&oe=665BFC2C',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17965659046419894',
//         caption:
//             'From inside to outside, Ayatrio artificial turf and artificial vertical gardens helped to invigorate this corporate office that is meant to inspire lifelong learning.\n' +
//             'Artificial green walls were strategically incorporated to calm the minds of all who visit and enables them to be in a better mental state for learning.\n' +
//             '\n' +
//             '#ayatrio #ayatriobrand #ayatriointerior #ayatriofurnishing #kolkatatopinteriorbrandayatrio #topinteriorbrand #ArtificialGrassFloor #ArtificialgrassCommercialuse #commercialfloordesign #officefloorideas #trendyofficefloordesign #officeflooring #commercialartificialfloorgrass #officeartificialgrassflooringideas #arificialgrassfloordesign',
//         like_count: 48,
//         permalink: 'https://www.instagram.com/tv/CQVpiOOlB08/',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17976971539366452',
//         caption:
//             'With the fascination for modern art and style, our restaurants designs express it all. Space Composers is a multi-disciplinary firm of experienced professionals offering comprehensive services in interior design, landscape to residential, hospitality & commercial projects across West Bengal..\n' +
//             'Create mesmerizing interior designs with lots of charm and character. Make a space look and feel very soothing and relaxing. ⠀\n' +
//             '\n' +
//             '#ayatrio #restaurant #restaurantdesign #restaurantdecor #restaurantstyle #commercial #commercialdesign #commercialdevelopment #interiordesign #interiors #wallcoverings #wallpapers #flooring #kolkata',
//         like_count: 103,
//         permalink: 'https://www.instagram.com/p/CNCtbSGFJtR/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/167398499_930088434411596_9030929424001526564_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=WIpOyFsaEGwQ7kNvgH-39NS&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYDT-wrB6kpYn-tFyzF_pvUO8nzWDttcaOIQm2LJAHXfdQ&oe=665C1275',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '18255287026133512',
//         caption:
//             'Artificial grass can be seen everywhere from football grounds to the home’s foyer. When it comes to interior decoration, artificial turf can change the atmosphere of a room, bring a natural ambience to the space and is an excellent grass wall decor idea. artificial grass wall design ideas to feel a calming and refreshing ambience in your house.\n' +
//             '\n' +
//             '#ayatrio #artificialgrass #flooring #ecofriendly #fresh #interior #homedecor #interiordesign #interiordecoration #homedecoration #homestyle #innovative #love #beauty #architecture #decorative #decor #City #india #kolkata',
//         like_count: 6,
//         permalink: 'https://www.instagram.com/p/Cl77hJurlId/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t39.30808-6/318141664_1584601918667062_6814020915529277564_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=18de74&_nc_ohc=oOuVngX4cTMQ7kNvgEFVYcA&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYAW6QMrzlAxncpr5rD8_Zabbj8WamT3qMhF3YWo_PZcUQ&oe=665C0969',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17917859051365969',
//         caption:
//             'Vinyl flooring is a product composed of several layers of different materials sandwiched together to form a highly durable, practical and affordable floor covering. The two main types of vinyl flooring are Luxury Vinyl Tiles (LVT) and vinyl roll. Both LVT and vinyl roll are made from the same materials, however, they\'re constructed differently to produce different effects. \n' +
//             'Check out more information about Ayatrio Vinyl flooring at https://www.ayatrio.com/products/floor/vinyl/index.html\n' +
//             '#ayatrio #flooring #vinylflooring  #floordesign #forbetterliving',
//         like_count: 21,
//         permalink: 'https://www.instagram.com/p/Ce3AOGrhUKv/',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17976055262130802',
//         caption:
//             'Say goodbye to mowing, weeding and fertilising. Artificial grass creates the perfect lawn all year round without the chore of maintenance. Child and pet-friendly, our artificial grass ranges are manufactured from only the highest quality eco-materials; meaning they are free from lead or cadmium.As long as the supporting surface is flat, stable and permeable to water, you can fit the grass virtually anywhere.\n' +
//             '\n' +
//             '#ayatrio #artificialgrass #flooring #ecofriendly #fresh #interior #homedecor #interiordesign #interiordecoration #homedecoration #homestyle #innovative #love #beauty #architecture #decorative #decor #City #india #kolkata',
//         like_count: 15,
//         permalink: 'https://www.instagram.com/p/CqmuSxVBN6k/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t39.30808-6/339640734_229314399635438_1782402176981006889_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=IfBf9tzUH10Q7kNvgEXaOIo&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCzzPHr82U5JFn06U-clgVfI2Go5T4ASWAH8N6_0m3YTg&oe=665C0C01',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17953050200033386',
//         caption:
//             'Engineered wood floor all the traditional aesthetics of solid hardwood, with an innovation of design that makes it even more versatile! Comprising of several layers, the top layer being a species of real hardwood, engineered hardwood flooring is a robust flooring option that allows you to install your chosen color, cut, finish and surface texture in areas where solid hardwood is not recommended. The core layer of engineered hardwood is made up of pine and spruce woods, which allows the engineered flooring to expand and contract with changing temperature and moisture levels without affecting your floor, the way a solid hardwood floor would be affected. \n' +
//             '\n' +
//             'Check out more information about Ayatrio Engineered wood floor solution at https://www.ayatrio.com/products/floor/engineer/index.html\n' +
//             '#ayatrio #flooring #engineer #Engineeredwoodfloor #floordesign #woodenflooring #vinylplank #floortile',
//         like_count: 8,
//         permalink: 'https://www.instagram.com/p/CjmwiaXuu4o/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/311121487_3365560060390355_7750860004209293217_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=18de74&_nc_ohc=DvfMelekKQcQ7kNvgFKl6z0&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYBb6DR8iRTBB9PMJnRqp3sx6oMQtl63dGsYAzLVqMpgpQ&oe=665BF67E',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17904931306893953',
//         caption:
//             'Ayatrio Rich Dark Green brick Wallpaper design with beautiful shimmer paper. This brick effect wallpaper enhance the dark beauty and the modern styling.\n' +
//             '\n' +
//             '#ayatrio #modernwallpaper #newwallpaper #wallpaperart #aestheticwallpapers #wallcovering #wallcoverings #residentialdesign #wallpaperdesign #wallpapersticker',
//         like_count: 86,
//         permalink: 'https://www.instagram.com/p/CQQKFPkFGT6/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/201814177_171459941609775_1508655769253292111_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=18de74&_nc_ohc=kp3MGh96gMQQ7kNvgGGi6Gw&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCouYvMwig8aDvieRvwICyo9SrjeaBxRO_cRCAbihe8CA&oe=665BE8FF',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '18351740869102062',
//         caption:
//             'Say goodbye to mowing, weeding and fertilising. Artificial grass creates the perfect lawn all year round without the chore of maintenance. Child and pet-friendly, our artificial grass ranges are manufactured from only the highest quality eco-materials; meaning they are free from lead or cadmium. As long as the supporting surface is flat, stable and permeable to water, you can fit the grass virtually anywhere.\n' +
//             '\n' +
//             'Check out more information about Ayatrio Artificial Grass flooring solution at https://www.ayatrio.com/\n' +
//             '.\n' +
//             '.\n' +
//             '#ayatrio #artificialgrass #flooring #ecofriendly #fresh #interior #homedecor #interiordesign #interiordecoration #homedecoration #homestyle #innovative #love #beauty #architecture #decorative #decor #City #india #kolkata',
//         like_count: 8,
//         permalink: 'https://www.instagram.com/p/C6spTjKNfjo/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t39.30808-6/441286754_446537458066904_200459885877707821_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=bKtj14qWLaEQ7kNvgFwNoeM&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCjKLj18R5kRnAGlTkU1E8uYgpI_h6J03IsaA_pqeLQzA&oe=665BE46C',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '18028043596767927',
//         caption:
//             'Are you considering new floors that are pet and child friendly? There’s much to consider when shopping for hardware for fluffy friends or growing kids. Safety is paramount, and whether the room is highly trafficked by children, or an entertainment room that’s cat and dog-friendly, SPC rigid core vinyl flooring is a type of luxury vinyl tile (LVT) that’s set apart from other vinyl flooring types thanks to its uniquely resilient core layer that makes this flooring extremely durable and hard-wearing. Boasting all the benefits of LVT such as being easy to clean, pet-friendly and 100% waterproof, our rigid core vinyl range has a lot to offer.\n' +
//             'Check out more information about Ayatrio spc flooring solution at www.ayatrio.com\n' +
//             '#ayatrio #spcflooring #spcfloor #woodenflooring #floortile #flooringdesign #floordesign #flooranddecor #gymflooring #rubberflooring #engineeredhardwood #hardwoodfloor #flooringideas #homedesignideas #floorplans #hardwoodfloors #woodfloor #woodfloors #woodflooring #hardwood #floor #homerenovation #interiordesign #interiordesignideas #homedesign #kolkata',
//         like_count: 9,
//         permalink: 'https://www.instagram.com/p/C3uFW_4BIYx/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t39.30808-6/429511450_402345659152751_3790059006262701861_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=uYA0U5W4XtYQ7kNvgEfj-M7&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCEArr4sbnza3dP5yj3tHTlX0IBzKtaAyj0_kMmJPsBSQ&oe=665BE4EF',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17849097154968394',
//         caption:
//             'Deep, rich midnight tones are perfectly highlighted with copper metallic on this beautifully textured wallpaper. Boreas Midnight is a classic sprig design in a contemporary, on-trend color palette inspired by woodland trails at night.\n' +
//             '#ayatrio #wallpapers #trees #midnight #design #interior #homedecor #interiordesign #interiordecoration #homedecoration #homestyle #innovative #love #beauty #architecture #decorative #decor #City #india #kolkata',
//         children: { data: [{ id: '18006443173282247' }, { id: '17910368470419362' }] },
//         like_count: 78,
//         permalink: 'https://www.instagram.com/p/B-PXpABjSbz/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/90839193_801923926880534_143729506691753231_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=KM-68Kz5wKkQ7kNvgHwOyu1&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYCI7gu2dltm4Zb6tuSd_hEGV0ecFluFtnG2z8XiuFHrow&oe=665C01A1',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '18033289957351415',
//         caption:
//             'INNOVFLOR carpet is designed to fit virtually every purpose, decorating style, and budget💰. Searching🔎 for a classic plush frieze? Looking for a luxuriously smooth Saxony? Seeking the sophistication of intricate patterns? Ayatrio carpet offers thousands upon thousands of colors🌈, styles, and textures that will be perfect for your home🏡.\n' +
//             '.\n' +
//             '.\n' +
//             '.\n' +
//             '\n' +
//             '#carpettiles #carpettile #carpets #floors #carpeting #carpeting #carpet #ayatrio #sportsflooring #gymflooring #floordesign #commercialdesign #vinylplank #flooringdesign #floordesign #lvtflooring #flooring #hardwoodfloor #laminateflooring #flooringideas #floorplans #woodfloor #woodfloors #woodflooring #hardwood #floor #interiordesign',
//         like_count: 6,
//         permalink: 'https://www.instagram.com/p/Cc6uvOHhPCp/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/279406217_154130340428729_5342463876231999590_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=wubormlM2F0Q7kNvgGVqGwg&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYAIEuwTaVOx8z1sV-Thihiy_CoS6mXVvITHxU_dRP9wvw&oe=665C0E96',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17866743284475542',
//         caption:
//             'we\'re getting cozy at the Workplace! See how our new Textural Effects Carpet Flooring feature soft organic ground cover visuals with added tactility and humanity to bring the comfort of home into the workplace.\n' +
//             '#ayatrio #officedesign #moderndesign #carpet #carpettile #contractdesign #workspace #commercialdesign #officeinspo #commercialflooring #commericalcarpet #officecarpet',
//         like_count: 89,
//         permalink: 'https://www.instagram.com/p/CMo0i_yFliL/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/162218607_176996977426411_2866960917685846439_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=XW1bIynN9eoQ7kNvgEN9P1G&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYB5ARAeFB9AzWk5g4adcd-nX4-fi7-funFGzD8OB78szA&oe=665BF2D7',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17900397044105599',
//         caption:
//             'Brighten up your home with Ayatrio Frosted Privacy Window Film Nice privacy protection blurs unwanted views, simple frosting white decorates your place, static cling to the surface without glue for extra safety and convenience, simple peel-and-stick installation, easy to remove and re-apply for multiple times.\n' +
//             '\n' +
//             '#ayatrio #glassfilms #glassfilmcoating #glassfilmcustomised #glassfilmfrosted #windowglassfilmurah',
//         like_count: 157,
//         permalink: 'https://www.instagram.com/p/CRY840jFjkH/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.29350-15/218947832_1210652679364040_6685194125645439410_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=9IArl2SkRWcQ7kNvgGmXBuq&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYAw0oIN-eaO-sqFN_O0YXHQZOppAF8ZsLnxW1EtMKk5SQ&oe=665C191B',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '17949554899862676',
//         caption:
//             'Ayatrio Vinyl flooring is a product composed of several layers of different materials sandwiched together to form a highly durable, practical and affordable floor covering. The two main types of vinyl flooring are Luxury Vinyl Tiles (LVT) and vinyl roll. Both LVT and vinyl roll are made from the same materials, however, they\'re constructed differently to produce different effects.\n' +
//             '\n' +
//             '#ayatrio #flooring #luxuryvinylplank #vinylfloor  #floordesign #woodenflooring #vinylplank #floortile',
//         like_count: 29,
//         permalink: 'https://www.instagram.com/p/CczVNX8tEa7/',
//         media_url:
//             'https://scontent.cdninstagram.com/o1/v/t16/f1/m84/1D479D6529321DCBDF1E9624DB197885_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmZlZWQudW5rbm93bi1DMy43MjAuZGFzaF9iYXNlbGluZV8xX3YxIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&vs=857765362331374_154809765&_nc_vs=HBksFQIYTGlnX2JhY2tmaWxsX3RpbWVsaW5lX3ZvZC8xRDQ3OUQ2NTI5MzIxRENCREYxRTk2MjREQjE5Nzg4NV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJd2haQmZ3NUczZl9qWUJBQ0p0VHJ1Uk1vVi1icGt3QUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJp7XwYr4%2Fuo%2FFQIoAkMzLBdAQrul41P3zxgSZGFzaF9iYXNlbGluZV8xX3YxEQB16gcA&ccb=9-4&oh=00_AYBgU4PpXVBO8KZYi3af17g5i-6BGC_Mv3ZABTzGTjIHcA&oe=6657F8D4&_nc_sid=1d576d',
//         media_product_type: 'FEED'
//     },
//     {
//         id: '18036894376305242',
//         caption:
//             'Ayatrio Texture wallpaper wallcover are crucial to this stunning and classic design. Derived from a Ayatrio archival piece, soft white contrast with striking grey, white. Finished beautifully using mica to give a luxurious shimmer finish.\n' +
//             '\n' +
//             '#ayatrio #texturewallpaper #newwallpaper #wallpaperart #aestheticwallpapers #wallcovering #wallcoverings #residentialdesign #wallpaperdesign #homeimprovment #homerenovation #interiordesign #interiordesignideas #homedesign #kolkata #india',
//         like_count: 195,
//         permalink: 'https://www.instagram.com/p/CSoLL-UNgEG/',
//         media_url:
//             'https://scontent.cdninstagram.com/v/t51.2885-15/237084383_135431868727394_2712830606819981936_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=gjjYOzpMgdYQ7kNvgFQzA_e&_nc_ht=scontent.cdninstagram.com&edm=APCawUEEAAAA&oh=00_AYBJhEPfsV5wm9I2GWobfnBm-gMjBzCfj4rdPyGnvDNy8A&oe=665C033C',
//         media_product_type: 'FEED'
//     }
// ]

const UserReviewPosts = () => {

    const dispatch = useDispatch();
    const [postDetails, setPostDetails] = useState([])

    const fetchDetails = async () => {
        try {
            const responce = await axios.get(`https://graph.facebook.com/v20.0/18008984500097700/top_media?user_id=17841407828748565&fields=id%2Ccaption%2Cchildren%2Clike_count%2Cpermalink%2Cmedia_url%2Cmedia_product_type&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`)
            console.log(responce.data.data)
            setPostDetails(responce.data.data);
            console.log(postDetails)
        } catch (error) {
            console.log(" Some Error Occured")
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])


    const swiperOptions2 = {
        slidesPerView: 4.08,
        centeredSlides: false,
        spaceBetween: 1,
        modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
        navigation: {
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
        },
        noSwiping: true,
        allowSlidePrev: true,
        allowSlideNext: true,
    };

    const swiper1Ref = useRef(null);

    return (
        <div>
            <div className="mb-20  bg-white sm:pl-[50px]  pl-[20px]  lg:pl-[67px]">
                <div className="mb-2 pr-[20px] w-full flex justify-between items-center">
                    <div className="mb-[32px]">
                        <h2 className="font-semibold text-2xl pb-[8px] ">
                            As seen on Instagram
                        </h2>
                        <p className="text-[14px] line-clamp-2 lg:line-clamp-none">Get inspired by other Ayatrio shoppers! Share your photos on Instagram and tag @Ayatrio for a chance to be featured.</p>
                    </div>

                </div>
                <Swiper
                    ref={swiper1Ref}
                    {...swiperOptions2}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                    mousewheel={{
                        forceToAxis: true,
                        invert: false,
                    }}
                    freeMode={{
                        enabled: false,
                        sticky: true,
                    }}
                    breakpoints={{
                        300: {
                            slidesPerView: 1.1,
                            spaceBetween: 10,
                        },

                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 10,
                        },
                    }}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    slideNextClass="custom-next-button"
                    slidePrevClass="custom-prev-button"
                    // onSwiper={setSwiperRef}
                    className="px-10 lg:min-h-[600px]  "
                >
                    {!postDetails ? (
                        <SwiperSlide>
                            <div className="flex"></div>
                        </SwiperSlide>
                    ) : (
                        postDetails.length > 0 && postDetails?.map((item, idx) => {
                            return (
                                <SwiperSlide key={idx} className="ml-0">
                                    <div className="">
                                        <UserReviewPostsCard
                                            username={"Deepanshu603"}
                                            imgSrc={item.media_url}
                                            id={item._id}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default UserReviewPosts;
