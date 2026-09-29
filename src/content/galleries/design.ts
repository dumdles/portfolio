/**
 * /design: posters, apparel and other design work.
 *
 * To add work, put the images in public/images/gallery/ (metadata stripped,
 * phone numbers and other personal details covered, 2400px on the long
 * side at most), import them here, and add them to a collection.
 *
 * Titles, dates and descriptions come from what each piece itself says.
 * Leave a field out rather than guess.
 *
 * Layouts: "carousel" (a 3D ring with a description under the front
 * poster), "posters" (4:5 frames), "apparel" (front, back or print
 * artwork with a spec title block), "grid". Tags are listed in
 * src/content/tags.ts. The page stays unpublished, and the hobby tile
 * unlinked, until at least one collection has an image.
 */

import type { Gallery } from "./types";

import macropadWorkshop from "../../../public/images/gallery/2025-sp-sst-macropad-making-wworkshop-poster.png";
import orientationRecruitment from "../../../public/images/gallery/2023-eee-foc-glgm-recruitment-story.png";
import eventHighlights from "../../../public/images/gallery/2023-eeec-event-highlights-ig.jpg";
import slidesWorkshop from "../../../public/images/gallery/2023-slides-workshop-ig.png";
import festivalOfFears from "../../../public/images/gallery/2023-festival-of-fears-ig.jpg";
import subcommitteeRecruitment from "../../../public/images/gallery/2023-eeec-recruitment-ig.jpg";
import faceTheWaste from "../../../public/images/gallery/2023-sip-poster.png";
import estPrepKit from "../../../public/images/gallery/2023-est-prep-kit-ig.jpg";
import designCompetition from "../../../public/images/gallery/2022-shirt-design-comp-ig.png";

import eeeShirtWhite from "../../../public/images/gallery/sp-tshirt-white.png";
import mainCommitteeJacket from "../../../public/images/gallery/2023-eeec-maincomm-jacket.png";
import robocupShirt from "../../../public/images/gallery/2024-qingdao-robocup-shirt.png";

export const design: Gallery = {
  slug: "design",
  title: "Design",
  lead: "Posters and apparel, most of them from my year as publications secretary of the EEE Club at Singapore Polytechnic.",
  collections: [
    {
      id: "posters",
      layout: "carousel",
      title: "Posters",
      tags: ["poster"],
      // Newest first.
      items: [
        {
          src: macropadWorkshop,
          title: "Macropad making workshop",
          date: "Apr 2025",
          description: "A workshop at Singapore Polytechnic on 23 April 2025, where SST students built their own programmable macropads, run by SST alumni.",
          alt: "A pale grid poster for a macropad making workshop for SST students by SST alumni, 23 April 2025 at Singapore Polytechnic. A row of four navy keycaps sits on grey switches beside a starburst reading Make your own programmable macropad.",
          tags: ["sst"],
        },
        {
          src: orientationRecruitment,
          title: "Orientation camp leaders",
          date: "2024",
          description: "An Instagram story recruiting group leaders and game masters for the School of EEE's freshmen orientation camp, held 1 to 3 April 2024.",
          alt: "A tall Instagram story for the School of Electrical and Electronic Engineering freshmen orientation camp, AY2024/25. Two paper-doll figures, one blue and one red, stand between two outlined figures above the words Group Leader and Game Master Recruitment.",
          tags: ["eeec"],
        },
        {
          src: eventHighlights,
          title: "Event highlights",
          date: "Dec 2023",
          description: "A recap of the club's events from October to December 2023, from Subcommittee Bonding Day to Sports Fiesta.",
          alt: "A square recap titled Event highlights, October to December 2023, in the club's blue. Photo panels show members at Subcommittee Bonding Day, Festival of Fears, Halloween Fest, The Great Adventure and Sports Fiesta.",
          tags: ["eeec"],
        },
        {
          src: slidesWorkshop,
          title: "Slides design workshop",
          date: "Nov 2023",
          description: "A slides design workshop run with EIG on 15 November 2023, on transitions and making presentations people pay attention to.",
          alt: "A grey square poster for a slides design workshop, 15 November 2023, 1800 to 2030 in LT12B. Three rounded tags in blue, white and green read Learn epic transitions, Create engaging presentations and EIG's signature workshop.",
          tags: ["eeec"],
        },
        {
          src: festivalOfFears,
          title: "Festival of Fears",
          date: "Oct 2023",
          description: "A Halloween night on 27 October 2023, run with other clubs. The banner doubles as the map of the scare zones.",
          alt: "A wide banner for Festival of Fears, 27 October 2023: torn newspaper clippings, a stamp card and a coffin-shaped map of the scare zones, pinned to a dark board with red string.",
          tags: ["eeec"],
        },
        {
          src: subcommitteeRecruitment,
          title: "Subcommittee recruitment",
          date: "Jun 2023",
          description: "Recruitment for the club's 2023/24 subcommittees, open 15 to 23 June 2023, showing the events a member would help run.",
          alt: "A dark blue square poster for EEEC subcommittee recruitment, 15 to 23 June 2023. A diagonal strip of tinted photos shows the club's events, from Sports Fiesta to Dinner and Dance, beside illustrated cards giving reasons to join.",
          tags: ["eeec"],
        },
        {
          src: faceTheWaste,
          title: "FacetheWaste",
          date: "2023",
          description: "A poster for FacetheWaste, an app to make food composting easier, built around the question of how to get young people to waste less food.",
          alt: "A green A-size poster for FacetheWaste, asking how to encourage youths to adopt a zero-food-waste lifestyle. Two phone screens show the app's rewards and friends feed beside a QR code for a feedback form.",
        },
        {
          src: estPrepKit,
          title: "EST prep kit",
          date: "Feb 2023",
          description: "For the club's EST prep kit, at the EEEC clubroom on 8 and 10 February 2023.",
          alt: "A green square poster for the EEEC EST prep kit, 8 and 10 February 2023 at the EEEC clubroom. Chunky pink letters spell the title, and a cartoon egg in white gloves walks off carrying a shopping bag.",
          tags: ["eeec"],
        },
        {
          src: designCompetition,
          title: "Shirt and jacket design competition",
          date: "Dec 2022",
          description: "The club's competition to design its shirt and jacket, open 10 to 19 December 2022. The winner got a free copy of their design.",
          alt: "An orange square poster for the EEE shirt and jacket design competition, 10 to 19 December 2022. A white T-shirt reading Engineer sits between a looping ring and a smiley sticker offering CCA points, and a blue star says the winner gets a free copy of their design.",
          tags: ["eeec"],
        },
      ],
    },
    {
      id: "apparel",
      layout: "apparel",
      title: "Apparel",
      tags: ["apparel"],
      garments: [
        {
          id: "robocup-shirt-2024",
          name: "RoboCup Asia Pacific 2024 shirt",
          print: {
            image: robocupShirt,
            // White ink: shown on a dark backdrop so the drawing reads.
            backdrop: "#343a44",
            alt: "Print artwork for the RoboCup Asia Pacific 2024 shirt: a white line drawing of a humanoid robot holding a Singapore flag, with a circled close-up of its foot labelled Engineered to specifications. Along the bottom, luggage stickers for Qingdao sit beside a drawing title block giving the event, 24 to 27 October 2024, Singapore Polytechnic and a scale of 1:50.",
          },
          specs: [
            { label: "Event", value: "RoboCup Asia Pacific 2024, Qingdao" },
            { label: "Year", value: "2024" },
          ],
        },
        {
          id: "eeec-24th-main-committee-jacket",
          name: "24th Main Committee jacket",
          print: {
            image: mainCommitteeJacket,
            alt: "Print artwork for the EEEC 24th Main Committee jacket: white line drawings of a waving circle, a triangle, a cloud and a skateboarding square on black, above the words 24th Main Committee and a short paragraph on what the club does.",
          },
          specs: [
            { label: "Garment", value: "Jacket" },
            { label: "Year", value: "AY23/24" },
          ],
          tags: ["eeec"],
        },
        {
          id: "eee-tee-ay2324",
          name: "Club T-shirt, AY23/24",
          back: {
            image: eeeShirtWhite,
            alt: "The back of a white EEE Club T-shirt for AY23/24. Black line drawings of a laptop, a fighter jet, a signal tower and a rising bar chart stand on a grid, each labelled with one of the school's engineering courses.",
          },
          specs: [
            { label: "Garment", value: "T-shirt, white" },
            { label: "Year", value: "AY23/24" },
          ],
          tags: ["eeec"],
        },
      ],
    },
  ],
};
