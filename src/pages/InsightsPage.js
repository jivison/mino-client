import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Pie } from "@nivo/pie";

import ReactWordCloud from "react-wordcloud";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InsightCard from "../components/InsightCard";
import MinoRequest from "../api/MinoRequest";
import Insights from "../models/Insights";
import Page from "./Page";
import "../styles/pages/InsightsPage.sass";

function sortTagData(tagData) {
    return Object.keys(tagData).sort((a, b) => {
        return tagData[a].length - tagData[b].length;
    });
}

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

function no_zero(value) {
    return value > 0 ? value : ">0.1";
}

function InsightsPage() {
    const [data, setData] = useState();
    const [pieData, setPieData] = useState([]);
    const [wordcloudData, setWordcloudData] = useState([]);

    useEffect(() => {
        if (data) {
            setPieData(
                sortTagData(data.tags)
                    .reverse()
                    .slice(0, 30)
                    .reverse()
                    .reduce((acc, val) => {
                        acc.push({
                            id: val,
                            label: val,
                            value: data.tags[val].length
                        });
                        return acc;
                    }, [])
            );
            setWordcloudData(
                sortTagData(data.tags).reduce((acc, val) => {
                    acc.push({
                        text: val,
                        value: data.tags[val].length
                    });
                    return acc;
                }, [])
            );
        }
        return () => {};
    }, [data]);

    return (
        <Page title="Insights">
            <MinoRequest modelAction={Insights.index} setFunction={setData}>
                {data && (
                    <Tabs>
                        <TabList>
                            <Tab>At a glance</Tab>
                            <Tab>Tags</Tab>
                        </TabList>

                        {/* At a glance */}
                        <TabPanel>
                            <div className="InsightsPage-cards">
                                <InsightCard title="Counts">
                                    <p>
                                        In your library, you have: <br />
                                        <span className="highlight">
                                            {data.artists.length}
                                        </span>{" "}
                                        artists <br />
                                        <span className="highlight">
                                            {data.albums.length}
                                        </span>{" "}
                                        albums <br />
                                        <span className="highlight">
                                            {data.tracks.length}
                                        </span>{" "}
                                        tracks <br />
                                        <span className="highlight">
                                            {data.additions.length}
                                        </span>{" "}
                                        additions <br />
                                        <span className="highlight">
                                            {data.maps.length -
                                                data.tracks.length}
                                        </span>{" "}
                                        maps <br />
                                    </p>
                                </InsightCard>
                                <InsightCard title="Top Artists">
                                    <ul className="top-artists-list">
                                        {data.top_artists
                                            .reverse()
                                            .slice(0, 5)
                                            .map((artist, index) => {
                                                return (
                                                    <li key={index}>
                                                        {index + 1}.{" "}
                                                        {artist.title}{" "}
                                                        <span className="highlight">
                                                            {artist.track_count}{" "}
                                                            {artist.track_count ===
                                                            1
                                                                ? "track"
                                                                : "tracks"}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </InsightCard>
                                <InsightCard title="Top Albums">
                                    <ul className="top-albums-list">
                                        {data.top_albums
                                            .reverse()
                                            .slice(0, 5)
                                            .map((album, index) => {
                                                return (
                                                    <li key={index}>
                                                        {index + 1}.{" "}
                                                        {album.title}{" "}
                                                        <span className="highlight">
                                                            {album.track_count}{" "}
                                                            {album.track_count ===
                                                            1
                                                                ? "track"
                                                                : "tracks"}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </InsightCard>
                                <InsightCard title="Averages">
                                    <p>
                                        On average, each: <br />
                                        Artist has{" "}
                                        <span className="highlight">
                                            {average(
                                                data.tracks_per_artist
                                            ).toFixed(2)}{" "}
                                            tracks
                                        </span>{" "}
                                        and{" "}
                                        <span className="highlight">
                                            {average(
                                                data.albums_per_artist
                                            ).toFixed(2)}{" "}
                                            albums
                                        </span>
                                        <br />
                                        Album has{" "}
                                        <span className="highlight">
                                            {average(
                                                data.tracks_per_album
                                            ).toFixed(2)}{" "}
                                            tracks
                                        </span>
                                        <br />
                                        Track has{" "}
                                        <span className="highlight">
                                            {average(
                                                data.tags_per_track
                                            ).toFixed(2)}{" "}
                                            tags
                                        </span>
                                    </p>
                                </InsightCard>
                                <InsightCard title="Percentages">
                                    <p>
                                        <span className="highlight">
                                            {no_zero(
                                                (
                                                    data.num_albums_with_images /
                                                    data.albums.length
                                                ).toFixed(2) * 100
                                            )}
                                            %
                                        </span>{" "}
                                        of albums have album art. (
                                        {data.num_albums_with_images})
                                        <br />
                                        <span className="highlight">
                                            {no_zero(
                                                (
                                                    data.num_artists_with_images /
                                                    data.artists.length
                                                ).toFixed(2) * 100
                                            )}
                                            %
                                        </span>{" "}
                                        of artists have artist art. (
                                        {data.num_artists_with_images})
                                        <br />
                                        <span className="highlight">
                                            {no_zero(
                                                (
                                                    data.num_tracks_with_tags /
                                                    data.tracks.length
                                                ).toFixed(2) * 100
                                            )}
                                            %
                                        </span>{" "}
                                        of tracks have at least one tag. (
                                        {data.num_tracks_with_tags})
                                        <br />
                                    </p>
                                </InsightCard>
                                <InsightCard title="Formats">
                                    <p>
                                        Each artist has on average{" "}
                                        <span className="highlight">
                                            {average(
                                                data.formats_per_artist
                                            ).toFixed(2)}{" "}
                                            different formats
                                        </span>
                                        <br />
                                        {Object.keys(data.format_hash)
                                            .sort((a, b) => {
                                                return (
                                                    data.format_hash[b] -
                                                    data.format_hash[a]
                                                );
                                            })
                                            .map(function(format_key) {
                                                return (
                                                    <>
                                                        {format_key
                                                            .split(" ")
                                                            .map(word => {
                                                                return (
                                                                    word
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                    word
                                                                        .split(
                                                                            ""
                                                                        )
                                                                        .slice(
                                                                            1
                                                                        )
                                                                        .join(
                                                                            ""
                                                                        )
                                                                );
                                                            })
                                                            .join(" ")}{" "}
                                                        <span className="highlight">
                                                            {no_zero(
                                                                (
                                                                    (data
                                                                        .format_hash[
                                                                        format_key
                                                                    ] /
                                                                        data.format_count) *
                                                                    100
                                                                ).toFixed(0)
                                                            )}
                                                            %
                                                        </span>
                                                        <br />
                                                    </>
                                                );
                                            })}
                                    </p>
                                </InsightCard>
                            </div>
                        </TabPanel>

                        {/* Tags */}
                        <TabPanel>
                            <div class="InsightsPage-cards">
                                <InsightCard
                                    title="Tag Wordcloud"
                                    widthOverride="47%"
                                >
                                        <div
                                            style={{
                                                height: "50vh",
                                                width: "100%"
                                            }}
                                        >
                                            <ReactWordCloud
                                                words={wordcloudData}
                                                height="500px"
                                                options={{
                                                    fontFamily: "Noto Sans KR",
                                                    fontSizes: [10, 100],
                                                    rotations: 3,
                                                    rotationAngles: [-30, 30],
                                                    colors: [
                                                        "#00b2b2",
                                                        "#008080",
                                                        "#005959",
                                                        "#004747",
                                                        "#002a2a"
                                                    ]
                                                }}
                                            />
                                        </div>
                                    
                                </InsightCard>
                                <InsightCard
                                    title="Your top 30 Tags"
                                    widthOverride="47%"
                                >
                                    <Pie
                                        height={500}
                                        width={750}
                                        data={pieData}
                                        margin={{
                                            top: 40,
                                            right: 80,
                                            bottom: 80,
                                            left: 80
                                        }}
                                        innerRadius={0.5}
                                        padAngle={0.7}
                                        cornerRadius={3}
                                        colors={{ scheme: "nivo" }}
                                        borderWidth={1}
                                        borderColor={{
                                            from: "color",
                                            modifiers: [["darker", 0.2]]
                                        }}
                                    />
                                </InsightCard>
                            </div>
                        </TabPanel>
                    </Tabs>
                )}
            </MinoRequest>
        </Page>
    );
}

InsightsPage.propTypes = {
    data: PropTypes.object
};
export default InsightsPage;
