import React, { Component } from "react";

import { Editor } from "proto-editor";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(cards) {
    console.log(cards);
  }

  render() {
    let cards = [
      {
        type: "card",
        attrs: {
          url:
            "https://cdn.protograph.pykih.com/99e448b6fcb668c5a3d4/index.html?view_cast_id=7a312bd07ab133968703ec4e&base_url=https://www.responsiblebiz.org",
          size: 75,
          height: 419,
          align: "center",
          caption: "",
          "data-card-id": 62499,
          "data-template-id": 47,
        },
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": 62494 },
        content: [
          {
            type: "text",
            text: "As the entire nation, especially Northern states rose to ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.hindustantimes.com/india-news/north-india-exposed-to-severe-air-pollution-levels-morning-after-diwali/story-5WgmdmAN6jTOlYoBNmxNhP.html",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "alarmingly spiked levels of air pollution",
          },
          {
            type: "text",
            text:
              " a day after Diwali, the spotlight has again moved to India’s pollution problem. According to the recent ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "http://www.who.int/ceh/publications/air-pollution-child-health/en/",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "WHO report",
          },
          {
            type: "text",
            text:
              ", a whopping nine in 10 people on Earth breathe highly polluted air. But even among countries gasping for breath, ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.vox.com/2018/5/8/17316978/india-pollution-levels-air-delhi-health",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "India stands out for air",
          },
          {
            type: "text",
            text: " that is consistently, especially terrible.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2, id: null, "data-card-id": 62495 },
        content: [{ type: "text", text: "What Is Causing Pollution In India" }],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          { type: "text", text: "A 2011" },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.hindustantimes.com/delhi-news/blame-industry-not-cars-for-pollution/story-wzXK7KskS8vEBqsSpL04ZO.html",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: " Source Appropriation Study",
          },
          {
            type: "text",
            text:
              " in seven mega cities by the then Ministry of Environment clearly stated that though Indian cities see a large fleet of vehicles on road every day; contrary to the popular belief industrial emission and road dust ( caused by industries ) are prominent causes of pollution.",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text: "Industrial pollution continues to be the main cause and ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.conserve-energy-future.com/causes-effects-of-industrial-pollution.php",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "goes unharnessed",
          },
          {
            type: "text",
            text:
              " in dearth of lack of policies, usage of outdated technologies and unplanned waste disposal practices.",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "A government body Environment Pollution (Prevention & Control) Authority (EPCA) for the NCR last year also ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "http://www.epca.org.in/CS-haryana.pdf",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "mentioned ",
          },
          {
            type: "text",
            text:
              "various industrial factors—like dust emanated by brick kilns, hot mix plants, stone crushers, etc —that were responsible for the ‘severe’ air quality of the region. However, there is no evidence of any compliance by the authorities, industries or the environment body itself.",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          { type: "text", text: "The" },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.downtoearth.org.in/blog/environment/environmental-governance-in-india-pushes-industries-to-face-stricter-pollution-norms-53999",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: " environmental regulation",
          },
          {
            type: "text",
            text:
              " has shown many improvements, pollution limits of many industries have been tightened but a lot remains to be done in this regard.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2, id: null, "data-card-id": 62496 },
        content: [{ type: "text", text: "What Are We Reading:" }],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "How India can use better data and regulations to stop industries from choking its cities",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "Fourteen of the world’s 20 cities with highest air pollution are in ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://indianexpress.com/article/india/14-of-indias-cities-are-among-the-top-20-most-polluted-ones-globally-heres-the-list-5159794/",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "India.",
          },
          {
            type: "text",
            text:
              " Why is this the case, when India has set pollution limits and stipulated strict criminal punishments to enforce them? A ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://indianexpress.com/article/opinion/how-india-can-use-better-data-and-regulations-to-stop-industries-from-choking-its-cities/",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "report",
          },
          { type: "text", text: " in " },
          {
            type: "text",
            marks: [{ type: "em" }],
            text: "The Indian Express",
          },
          {
            type: "text",
            text: " digs into loopholes in regulations and its implementation.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "India needs transparent industrial pollution data, regulation reforms",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "How much information about pollution from industries is available to the public? How industries perform on pollution, remains a black box. This kind of monitoring has to be done manually and is a resource intensive and time consuming process. This ",
          },
          {
            type: "text",
            marks: [{ type: "em" }],
            text: "Hindustan Times",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.hindustantimes.com/india-news/india-needs-transparent-industrial-pollution-data-regulation-reforms/story-W71D1PYWBSqfcaYZ56YcLL.html",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "piece",
          },
          {
            type: "text",
            text:
              " talks of a lack of confidence in the data, and incomplete information, prevents it from being put to its best use: ensuring industries comply with standards and lowering pollution levels.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [{ type: "text", text: "Building from debris" }],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "Delhi’s air pollution is in no small measure due to the high presence of particulate matter (PM 2.5 and PM 10), resulting from the construction debris strewn around the city. Construction and demolition waste is an environment and public health hazard.",
          },
          {
            type: "text",
            marks: [{ type: "em" }],
            text: " The Indian Express",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://indianexpress.com/article/opinion/columns/building-from-debris/",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "article",
          },
          {
            type: "text",
            text:
              " argues that recycling and reuses offers a sustainable solution and companies should take a cue and work towards a sustainable future. ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://indianexpress.com/article/opinion/columns/india-urbanisation-urbanisation-waste-management-environment-pollution-5415096/",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "A proactive effort",
          },
          {
            type: "text",
            text:
              " from municipalities and citizens towards recycling of construction and demolition waste will go a long way in curbing pollution.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text: "Decentralisation of Environmental Regulations in India",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "The decentralisation of Environment Impact Assessment processes has improved the enforcement of environmental regulations and been successful in reducing polluting activities in India. Evidence suggests that decentralisation was associated with relatively fewer firm births in states with stricter environmental law enforcement. This ",
          },
          {
            type: "text",
            marks: [{ type: "em" }],
            text: "Economic and Political Weekly",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://www.epw.in/journal/2018/43/perspectives/decentralisation-environmental.html",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "article",
          },
          { type: "text", text: " takes a close look." },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "Can India’s solar revolution help meet its Paris Agreement emission goals?",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "Being a coal-obsessed nation with tremendous aspirations for cars and fast bikes, India’s greenhouse gas emissions recorded an annual growth of 5.6 percent between 2005 and 2013. With frenzied expansion of solar parks and a hold on new coal-fired power plants, there is hope that India may be able to fulfill its commitment to reduce emissions as per the 2015 Paris Agreement, ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://india.mongabay.com/2018/10/22/can-indias-solar-revolution-help-meet-its-paris-agreement-emission-goals/",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "reports",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [{ type: "em" }],
            text: "Mongabay India.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "EPCA was specially empowered to deal with air pollution crises. Is it working?",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: { class: null, "data-card-id": null },
        content: [
          {
            type: "text",
            text:
              "Despite being vested with enormous powers, the EPCA has been reluctant to proactively rein in the 'airpocalypse' in the National Capital Region. Based on RTI replies by the body, ",
          },
          {
            type: "text",
            marks: [{ type: "em" }],
            text: "The Wire",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href:
                    "https://thewire.in/government/epca-was-specially-empowered-to-deal-with-air-pollution-crises-is-it-working",
                  title: null,
                  target: "_top",
                },
              },
            ],
            text: "report",
          },
          {
            type: "text",
            text:
              " probes the its performance, reluctant to issue any directions vis-à-vis environmental quality, restriction of activities, control over emissions and other subjects the authority has mandate over.",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3, id: null, "data-card-id": null },
        content: [{ type: "hard_break" }],
      },
    ];

    return (
      <div>
        <div className="editor-container">
          <Editor cards={cards} onSubmit={this.handleSubmit} />
        </div>
        <pre>
          {/* {this.state && <code>{JSON.stringify(this.state.doc.view.state.doc, null, 2)}</code>} */}
        </pre>
      </div>
    );
  }
}
