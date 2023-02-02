// React
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userHasError, initializeDemoUser } from '../../features/user/state/userSlice';

// CSS
import styles from './Home.module.css';

// Components
import { Navbar } from '../../components/Navbar/Navbar';
import { DemoGrid } from '../../components/Grid/DemoGrid';
import { DemoAccount } from '../Account/DemoAccount';

// libs
import { useTranslation } from 'react-i18next';


export const DemoHome = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const isAuthenticated = user.email || user.google_name ? true : false;
	!isAuthenticated && navigate('/signin')

	const { t } = useTranslation();

	useEffect(() => {
		console.log('Dispatching getUser, getLists, getRecipes');
		dispatch(initializeDemoUser());
	}, [dispatch]);

	useEffect(() => {
		console.log(user.language);
		// i18n.changeLanguage(user.language);
	}, [user.language]);

	let { targetPage } = useParams();
	let accountPage = targetPage === 'account';


	const quickTourLargeScreen = [
		{
			message: t('quickTour.tab'),
			arrowNum: 0,
			textX: '200px',
			textY: '12rem',
			width: '27rem',
			imgX: '200px',
			imgY: '5rem',
			imgW: '93',
			imgH: '109',
			rotate: '0deg',
		},
		{
			message: t('quickTour.card'),
			arrowNum: 1,
			textX: '280px',
			textY: '50vh',
			width: '20rem',
			imgX: '170px',
			imgY: '28vh',
			imgW: '310',
			imgH: '152',
			rotate: '45deg',
		},
		{
			message: t('quickTour.add'),
			arrowNum: 2,
			textX: '20vw',
			textY: '12rem',
			width: '20rem',
			imgX: '28vw',
			imgY: '3rem',
			imgW: '83',
			imgH: '122',
			rotate: '0deg',
		},
		{
			message: t('quickTour.theme'),
			arrowNum: 3,
			textRight: '250px',
			textY: '3rem',
			width: '20rem',
			imgRight: '170px',
			imgY: '1rem',
			imgW: '150',
			imgH: '100',
			rotate: '0deg',
		},
		{
			message: t('quickTour.account'),
			arrowNum: 4,
			textRight: '50px',
			textY: '14rem',
			width: '25rem',
			imgRight: '50px',
			imgY: '5rem',
			imgW: '68',
			imgH: '145',
			rotate: '20deg',
		},
	];
	
	const quickTourSmallScreen = [
		{
			message: t('quickTour.tab'),
			arrowNum: 0,
			textX: '150px',
			textY: '13rem',
			width: '70vw',
			imgX: '100px',
			imgY: '5rem',
			imgW: '93',
			imgH: '109',
			rotate: '0deg',
		},
		{
			message: t('quickTour.theme'),
			arrowNum: 3,
			textX: '8rem',
			textY: '12rem',
			width: '20rem',
			imgX: '4rem',
			imgY: '4rem',
			imgW: '150',
			imgH: '100',
			rotate: '-135deg',
		},
		{
			message: t('quickTour.account'),
			arrowNum: 4,
			textX: '8rem',
			textY: '14rem',
			width: '25rem',
			imgX: '6rem',
			imgY: '3rem',
			imgW: '68',
			imgH: '145',
			rotate: '-40deg',
		},
		{
			message: t('quickTour.card'),
			arrowNum: 1,
			textRight: '1rem',
			textY: '50vh',
			width: '20rem',
			imgX: '27vw',
			imgY: '33vh',
			imgW: '200',
			imgH: '100',
			rotate: '45deg',
		},
		{
			message: t('quickTour.add'),
			arrowNum: 2,
			textRight: '50px',
			textY: '53vh',
			width: '20rem',
			imgRight: '30vw',
			imgY: '60vh',
			imgW: '83',
			imgH: '122',
			rotate: '90deg',
		}
	];

	let smallScreen = window.screen.availWidth < 740 ? true : false
	const quickTour = smallScreen? quickTourSmallScreen : quickTourLargeScreen

	const [index, setIndex] = useState(0);

	const nextTourMessage = () => {
		setIndex((prev) => prev+1 )
	};

	return (
		<div className={styles.homePage}>
			{index < quickTour.length && (
				<div data-testid='tour' className={styles.tourBackground} onClick={nextTourMessage}>
					<Arrows
						left={quickTour[index].imgX}
						right={quickTour[index].imgRight}
						top={quickTour[index].imgY}
						width={quickTour[index].imgW}
						height={quickTour[index].imgH}
						num={quickTour[index].arrowNum}
						rotate={quickTour[index].rotate}
					/>
					<div
						data-testid='tourMessage'
						className={styles.tourMessage}
						style={{
							left: quickTour[index].textX,
							right: quickTour[index].textRight,
							top: quickTour[index].textY,
							width: quickTour[index].width,
						}}
					>
						{quickTour[index].message} <br /> <p>{t('quickTour.clickContinue')}</p>
					</div>
				</div>
			)}
			{isAuthenticated && <Navbar targetPage={targetPage} user={user} />}
			{isAuthenticated && !accountPage && <DemoGrid targetPage={targetPage} user={user} />}
			{isAuthenticated && accountPage && <DemoAccount targetPage={targetPage} user={user} />}
		</div>
	);
};

const Arrows = ({ left, right, top, width, height, num, stroke = 'white', strokeWidth = '2px', rotate = '0deg' }) => {
	return (
		<div
			style={{ width: width, height: height, left: left, right: right, top: top, rotate: rotate }}
			className={styles.tourArrow}
		>
			{num === 0 && (
				<svg width={width} height={height} viewBox="0 0 93 109" xmlns="http://www.w3.org/2000/svg">
					<path
						id="arrow0"
						fill="none"
						stroke={stroke}
						strokeWidth={strokeWidth}
						d="M92.5 107.5C74 99 60.7825 89.9527 53.3431 81.3869C45.9037 72.8211 28.2045 46.4647 42.3066 38.5578C56.4088 30.6509 76.1317 49.934 64.9927 62.2786C53.8538 74.6231 20.2336 46.4647 0 1M0 1C1.83941 18.1316 5.51827 27.3564 5.51827 51.0771M0 1C0 1 20.8467 18.1316 38.6277 22.0851"
					/>
				</svg>
			)}
			{num === 1 && (
				<svg width={width} height={height} viewBox="0 0 310 152" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						id="arrow4"
						fill="none"
						stroke={stroke}
						strokeWidth={strokeWidth}
						d="M309.5 79.9997C260 74 262 59.9997 231 62.4997C200 64.9997 217.5 151.5 201 150C184.5 148.5 183.5 0.499674 157 1.49967C130.5 2.49967 172.5 121 157 123C141.5 125 124 40 114.5 41C105 42 115.119 101.193 102.5 91.5C68 65 3.5 79.9997 3.5 79.9997M3.5 79.9997C3.5 79.9997 63.5 58.9997 82 10.4997M3.5 79.9997C3.5 79.9997 75 109.5 82 135.5"
					/>
				</svg>
			)}
			{num === 2 && (
				<svg width={width} height={height} viewBox="0 0 83 122" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						id="arrow1"
						fill="none"
						stroke={stroke}
						strokeWidth={strokeWidth}
						d="M11.5 121C14 110.5 29 87 26.5 71C24 55 1 50 2 33C3 16 80.5 9 80.5 9M80.5 9L39.5 1.5M80.5 9L59 33"
					/>
				</svg>
			)}
			{num === 3 && (
				<svg width={width} height={height} viewBox="0 0 244 64" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						id="arrow3"
						fill="none"
						stroke={stroke}
						strokeWidth={strokeWidth}
						d="M1.5 40.5C1.5 40.5 33 65.5 90 46.5C147 27.5 242 24 242 24M242 24C242 24 238.5 10 169 1.5M242 24C242 24 249.5 35 180 62.5"
					/>
				</svg>
			)}
			{num === 4 && (
				<svg width={width} height={height} viewBox="0 0 68 145" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						id="arrow2"
						fill="none"
						stroke={stroke}
						strokeWidth={strokeWidth}
						d="M3.49994 144C3.49994 144 -0.499996 93.5 3.5 79C7.5 64.5 54.9999 117 54.4999 71.5C54 26 39.4999 2 39.4999 2M39.4999 2C39.4999 2 36.5 31.5 25.9999 48M39.4999 2C39.4999 2 65.5 23.5 66.9999 35"
					/>
				</svg>
			)}
		</div>
	);
};

