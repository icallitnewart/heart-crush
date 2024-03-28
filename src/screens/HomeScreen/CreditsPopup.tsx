import React from 'react';
import styled from 'styled-components';

import BackgroundLayer from '../../components/BackgroundLayer';
import PopupBox from '../../components/PopupBox';
import CloseButton from './CloseButton';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 400px;
`;

const CreditBox = styled.div`
	width: 100%;
	height: 400px;
	padding: 30px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-thumb {
		background: #ddd;
		border: 0.8px solid #666;
		border-radius: 4px;
	}
`;

const Title = styled.h1`
	position: relative;
	z-index: 9;
	margin-bottom: 35px;

	color: var(--main-color-yellow);
	-webkit-text-stroke: 1px #333;
	font-size: 2.5em;
	font-family: var(--main-font);
	letter-spacing: 3px;
	text-align: center;

	&::after {
		position: absolute;
		top: 2px;
		left: 50%;
		z-index: -1;
		transform: translateX(calc(-50% + 2px));
		content: 'Credits';
		display: inline-block;
		width: 100%;
		clear: both;

		color: var(--sub-color-pink);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
`;

const Section = styled.section`
	width: 100%;
	margin-bottom: 35px;
`;

const SubTitle = styled.h2`
	margin-bottom: 20px;
	font-size: 1.5em;
	font-family: var(--main-font);
	letter-spacing: 2px;
	text-align: center;
	text-transform: uppercase;

	color: var(--sub-color-purple);
	-webkit-text-stroke: 0.8px #333;
	text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
`;

const SongList = styled.ul`
	width: 100%;
	margin-bottom: 20px;
`;

const SongTitle = styled.li`
	width: 100%;
	margin-bottom: 10px;
	text-align: center;
	letter-spacing: 4px;
	font-size: 1.1em;
	font-family: var(--sub-font);
	text-transform: uppercase;

	color: var(--sub-color-pink);
	-webkit-text-stroke: 0.6px #999;
	text-shadow: 2px 2px 0px #999;
`;

const Source = styled.p`
	line-height: 1.6;
	margin-bottom: 15px;
	text-align: center;
	letter-spacing: 3px;
	font-family: var(--sub-font);
	font-size: 1.15em;

	color: var(--main-color-yellow);
	-webkit-text-stroke: 0.6px #888;
	text-shadow: 2px 1px 0px rgba(0, 0, 0, 0.3);
`;

const Link = styled.a`
	color: inherit;
	-webkit-text-stroke-color: inherit;
	text-decoration: none;
`;

const Description = styled.p`
	width: 100%;
	line-height: 1.5;
	font-size: 0.7em;
	text-align: center;
	font-family: var(--sub-font);
	word-break: break-all;

	-webkit-text-stroke: 0.4px #888;
	color: #bbb;
`;

function CreditsPopup() {
	return (
		<BackgroundLayer>
			<PopupBox>
				<Container>
					<CreditBox>
						<Title>Credits</Title>
						<Section>
							<SubTitle>Sound Effect</SubTitle>
							<Source>
								<Link
									href="https://www.zapsplat.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									ZapSplat
								</Link>
							</Source>
						</Section>
						<Section>
							<SubTitle>Music</SubTitle>
							<SongList>
								<SongTitle>Airship Serenity</SongTitle>
								<SongTitle>Ambler</SongTitle>
								<SongTitle>Blippy Trance</SongTitle>
								<SongTitle>Chipper Doodle V2</SongTitle>
								<SongTitle>Dance Monster</SongTitle>
								<SongTitle>Newer Wave</SongTitle>
								<SongTitle>Salty Ditty</SongTitle>
							</SongList>
							<Source>
								By Kevin MacLeod <br />
								<Link
									href="https://incompetech.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									incompetech.com
								</Link>
							</Source>
							<Description>
								Licensed under Creative Commons: <br />
								By Attribution 4.0 License <br />
								http://creativecommons.org/licenses/by/4.0/
							</Description>
						</Section>
					</CreditBox>
					<CloseButton />
				</Container>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default CreditsPopup;
