import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './Homepage.module.css';

// React-icons
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

// components
import { Button } from '../../components/Button/Button';
import { LanguagePicker } from '../../features/languages/components/LanguagePicker';

// libs
import { useTranslation } from 'react-i18next';
import { useParallax } from 'react-scroll-parallax';
import KUTE from 'kute.js';
import { Icon } from '@iconify/react';
import { useInView } from 'react-intersection-observer';


// data
import { exampleBologneseEN, exampleCarbonaraEN, exampleListEN } from './exampleIngredientsEN';
import { exampleBologneseDE, exampleCarbonaraDE, exampleListDE } from './exampleIngredientsDE';
import { exampleBologneseFR, exampleCarbonaraFR, exampleListFR } from './exampleIngredientsFR';
import { Checkbox } from '../../components/Checkbox/Checkbox';

export const Homepage = ({user}) => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	console.log('i18n.language: ', i18n.language)

	let exampleBolognese = i18n.language === 'EN'? exampleBologneseEN : i18n.language==='DE'? exampleBologneseDE : exampleBologneseFR
	let exampleCarbonara = i18n.language === 'EN'? exampleCarbonaraEN : i18n.language==='DE'? exampleCarbonaraDE : exampleCarbonaraFR
	let exampleList = i18n.language === 'EN'? exampleListEN : i18n.language==='DE'? exampleListDE : exampleListFR

	useEffect(() => {
        KUTE.fromTo('#wave1', { path: '#wave1' }, { path: '#wave4' }, { repeat: 50, duration: 2000, yoyo: true }).start();
		KUTE.fromTo('#wave2', { path: '#wave2' }, { path: '#wave5' }, { repeat: 50, duration: 2000, yoyo: true }).start();
		KUTE.fromTo('#wave3', { path: '#wave3' }, { path: '#wave6' }, { repeat: 50, duration: 2000, yoyo: true }).start();
		KUTE.fromTo('#wave7', { path: '#wave7' }, { path: '#wave10' }, { repeat: 50, duration: 2000, yoyo: true }).start();
		KUTE.fromTo('#wave8', { path: '#wave8' }, { path: '#wave11' }, { repeat: 50, duration: 2000, yoyo: true }).start();
		KUTE.fromTo('#wave9', { path: '#wave9' }, { path: '#wave12' }, { repeat: 50, duration: 2000, yoyo: true }).start();
        KUTE.fromTo('#wave13', { path: '#wave13' }, { path: '#wave16' }, { repeat: 50, duration: 2000, yoyo: true }).start();
        KUTE.fromTo('#wave14', { path: '#wave14' }, { path: '#wave17' }, { repeat: 50, duration: 2000, yoyo: true }).start();
        KUTE.fromTo('#wave15', { path: '#wave15' }, { path: '#wave18' }, { repeat: 50, duration: 2000, yoyo: true }).start();
	}, []);

	const card1 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 600, endScroll: 900 });
	const card2 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 350, endScroll: 900 });
	const card3 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 0, endScroll: 900 });
	const card4 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 650, endScroll: 900 });
	const card5 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 370, endScroll: 900 });
	const card6 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 50, endScroll: 900 });
	const card7 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 550, endScroll: 900 });
	const card8 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 350, endScroll: 900 });
	const card9 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 100, endScroll: 900 });
	const card10 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 600, endScroll: 900 });
	const card11 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 370, endScroll: 900 });
	const card12 = useParallax({ translateY: [0, -1000, 'easeIn'], startScroll: 50, endScroll: 900 });

	const title1 = useParallax({ opacity: [0, 1], startScroll: 200, endScroll: 1100 });
	const subtitle1 = useParallax({ opacity: [0, 1], startScroll: 200, endScroll: 1100 });
	const title2 = useParallax({ opacity: [0, 1], startScroll: 1000, endScroll: 1800 });
	const subtitle2 = useParallax({ opacity: [0, 1], startScroll: 1000, endScroll: 1800 });
	
    const { ref:stackButtonIconRef, inView: inView1 } = useInView()
    const { ref:stackLastIconRef, inView: inView2 } = useInView()
    const { ref:trigger, inView:triggerInView } = useInView()

	return (
		<div className={styles.homepageWrapper}>
			<div className={styles.triggerArrows} ref={trigger}></div>
			{triggerInView && <div className={styles.arrow}>
				<svg preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
					<path className={styles.arrow1} d="M18 6.41L16.59 5L12 9.58L7.41 5L6 6.41l6 6z"/>
					<path className={styles.arrow1} d="m18 13l-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"/>
				</svg>
			</div>}
			<nav className={styles.navbar}>
				<div className={styles.navGroup1}>
					<div className={styles.imgContainer}>
						<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
					</div>
				<FaGithub className={styles.github} onClick={() => { window.location.href='https://github.com/LongWyrsch/Grocery-list_frontend' }} style={{color: 'black'}}/>
				</div>
				<div className={styles.navGroup2}>
                    <Button
						buttonStyle="elevated"
						text={t('homepage.demoAccount')}
						onClick={() => {
							navigate('/demo/recipes');
						}}
                    />
					<Button
						buttonStyle="outlined"
						text={t('auth.signin')}
						onClick={() => {
							navigate('/signin');
						}}
					/>
					<Button
						buttonStyle="outlined"
						text={t('auth.signup')}
						onClick={() => {
							navigate('/signup');
						}}
					/>
					<LanguagePicker />
				</div>
			</nav>
			<div className={`${styles.section} ${styles.hero}`}>
				<div className={styles.heroText}>
                    <div className={styles.heroTitle}>
                        <div className={styles.heroText1}>Grocery</div>
                        <div className={styles.heroText2}>lists</div>
                        <div className={styles.heroText3}>{t('homepage.madeEasy')}</div>
                    </div>
                    <div className={styles.demoAccount}>
                        <div>{t('homepage.checkoutthe')}</div>
                        <Button
							buttonStyle="elevated"
							text={t('homepage.demoAccount')}
							onClick={() => navigate('/demo/recipes')}
                    	/>
                    </div>
					<div className={styles.authButtons}>
						<Button
							buttonStyle="outlined"
							text={t('auth.signin')}
							onClick={() => {
								navigate('/signin');
							}}
						/>
						<Button
							buttonStyle="outlined"
							text={t('auth.signup')}
							onClick={() => {
								navigate('/signup');
							}}
						/>
					</div>
				</div>
				<div className={styles.heroCards}>
					<div className={styles.heroCard} style={{ height: '33%' }} ref={card1.ref}>
						Spaghetti Bolognese
					</div>
					<div className={styles.heroCard} style={{ height: '30%' }} ref={card2.ref}>
						Pad Thai
					</div>
					<div className={styles.heroCard} style={{ height: '25%' }} ref={card3.ref}>
						Butter Chiken
					</div>
					<div className={styles.heroCard} style={{ height: '25%' }} ref={card4.ref}>
						Oyakodon
					</div>
					<div className={styles.heroCard} style={{ height: '33%' }} ref={card5.ref}>
						Lasagna
					</div>
					<div className={styles.heroCard} style={{ height: '37%' }} ref={card6.ref}>
						Kema Curry
					</div>
					<div className={styles.heroCard} style={{ height: '38%' }} ref={card7.ref}>
						Burrito
					</div>
					<div className={styles.heroCard} style={{ height: '28%' }} ref={card8.ref}>
						Gyudon
					</div>
					<div className={styles.heroCard} style={{ height: '27%' }} ref={card9.ref}>
                        Carbonara
					</div>
					<div className={styles.heroCard} style={{ height: '32%' }} ref={card10.ref}>
						Bibimbap
					</div>
					<div className={styles.heroCard} style={{ height: '25%' }} ref={card11.ref}>
                    shepherd's Pie
					</div>
					<div className={styles.heroCard} style={{ height: '33%' }} ref={card12.ref}>
						Burgers
					</div>
				</div>
			</div>
			<div className={styles.wave1Container}>
				<svg className={styles.waves1} preserveAspectRatio="none" viewBox="0 0 900 150" width="120%" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<path id="wave1" className={styles.wave1} d="M0 41L225 45L450 14L675 54L900 24L900 151L675 151L450 151L225 151L0 151Z" />
					<path id="wave2" className={styles.wave2} d="M0 64L225 85L450 77L675 67L900 74L900 151L675 151L450 151L225 151L0 151Z" />
					<path id="wave3" className={styles.wave3} d="M0 137L225 96L450 106L675 106L900 123L900 151L675 151L450 151L225 151L0 151Z" />

					<path id="wave4" className={styles.wave4} style={{ visibility: 'hidden' }} d="M0 39L225 42L450 53L675 17L900 18L900 151L675 151L450 151L225 151L0 151Z" />
					<path id="wave5" className={styles.wave5} style={{ visibility: 'hidden' }} d="M0 67L225 84L450 51L675 76L900 77L900 151L675 151L450 151L225 151L0 151Z" />
					<path id="wave6" className={styles.wave6} style={{ visibility: 'hidden' }} d="M0 111L225 89L450 134L675 127L900 90L900 151L675 151L450 151L225 151L0 151Z" />
				</svg>
			</div>
			<div className={`${styles.section} ${styles.recipes}`}>
				<div className={styles.text}>
					<div className={styles.text1} ref={title1.ref}>
                        {t('homepage.title1')}
					</div>
					<div className={styles.text2} ref={subtitle1.ref}>
						{t('homepage.subtitle1')}
					</div>
				</div>
				<div className={styles.example}>
					<div className={styles.card}>
						<div className={styles.title}>{exampleBolognese[0].title}</div>
						{/* <div className={styles.close}>Close</div> */}
						<div className={styles.headings}>
							<div className={styles.ingredient}>{t('home.Ingredients')}</div>
							<div className={styles.quantity}>{t('home.Quantity')}</div>
							<div className={styles.unit}>{t('home.Unit')}</div>
							<div className={styles.section}>{t('home.Section')}</div>
							<div className={styles.kcal}>{t('home.kCal')}</div>
						</div>
						<div className={styles.rows}>
							{exampleBolognese.map((row, i) => (
								<div className={styles.row} key={i}>
									<div className={styles.ingredient}>{row.ingredient}</div>
									<div className={styles.quantity}>{row.quantity}</div>
									<div className={styles.unit}>{row.unit}</div>
									<div className={styles.section}>{row.section}</div>
									<div className={styles.kcal}>{Math.trunc(row.kcal)}</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.shadow}></div>
					<div className={styles.card}>
						<div className={styles.title}>{exampleCarbonara[0].title}</div>
						<div className={styles.headings}>
							<div className={styles.ingredient}>{t('home.Ingredients')}</div>
							<div className={styles.quantity}>{t('home.Quantity')}</div>
							<div className={styles.unit}>{t('home.Unit')}</div>
							<div className={styles.section}>{t('home.Section')}</div>
							<div className={styles.kcal}>{t('home.kCal')}</div>
						</div>
						<div className={styles.rows}>
							{exampleCarbonara.map((row, i) => (
								<div className={styles.row} key={i}>
									<div className={styles.ingredient}>{row.ingredient}</div>
									<div className={styles.quantity}>{row.quantity}</div>
									<div className={styles.unit}>{row.unit}</div>
									<div className={styles.section}>{row.section}</div>
									<div className={styles.kcal}>{Math.trunc(row.kcal)}</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.shadow}></div>
				</div>
			</div>
			<div className={styles.wave2Container}>
				<svg className={styles.waves2} preserveAspectRatio="none" viewBox="0 0 900 150" width="120%" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<path id="wave7" className={styles.wave7} d="M0 66L180 49L360 66L540 51L720 34L900 10L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
					<path id="wave8" className={styles.wave8} d="M0 64L180 100L360 71L540 86L720 86L900 102L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
					<path id="wave9" className={styles.wave9} d="M0 117L180 116L360 140L540 133L720 94L900 124L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
					<path id="wave10" className={styles.wave10} style={{ visibility: 'hidden' }} d="M0 17L180 29L360 21L540 62L720 43L900 54L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
					<path id="wave11" className={styles.wave11} style={{ visibility: 'hidden' }} d="M0 61L180 94L360 53L540 87L720 73L900 59L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
					<path id="wave12" className={styles.wave12} style={{ visibility: 'hidden' }} d="M0 135L180 90L360 97L540 127L720 126L900 106L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
				</svg>
			</div>
			<div className={`${styles.section} ${styles.lists}`}>
				<div className={styles.text}>
					<div className={styles.text1} ref={title2.ref}>
                        {t('homepage.title2')}
					</div>
					<div className={styles.text2} ref={subtitle2.ref}>
                        {t('homepage.subtitle2')}
					</div>
				</div>
				<div className={styles.example}>
					<div className={styles.card}>
						<div className={styles.title}>{t('homepage.listTitle')}</div>
						{/* <div className={styles.close}>Close</div> */}
						<div className={styles.recipeNames}>
							<div>{t('homepage.rec1')}</div>
							<div>{t('homepage.rec2')}</div>
							<div>{t('homepage.rec3')}</div>
						</div>
						<div className={styles.headings}>
							<div className={styles.ingredient}>{t('home.Ingredients')}</div>
							<div className={styles.quantity}>{t('home.Quantity')}</div>
							<div className={styles.unit}>{t('home.Unit')}</div>
							<div className={styles.section}>{t('home.Section')}</div>
						</div>
						<div className={styles.rows}>
							{exampleList.map((row, i) => (
								<div className={styles.row} key={i}>
									<Checkbox checked={row.checked} disabled="true" />
									<div className={styles.ingredient}>{row.ingredient}</div>
									<div className={styles.quantity}>{row.quantity}</div>
									<div className={styles.unit}>{row.unit}</div>
									<div className={styles.section}>{row.section}</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.shadow}></div>
				</div>
			</div>

            <div className={styles.wave3Container}>
                <svg className={styles.waves3} preserveAspectRatio="none"  viewBox="0 0 900 150" width="120%" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <path id="wave13" className={styles.wave13} d="M0 64L180 61L360 54L540 63L720 23L900 55L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
                    <path id="wave14" className={styles.wave14} d="M0 50L180 68L360 77L540 89L720 84L900 96L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
                    <path id="wave15" className={styles.wave15} d="M0 108L180 118L360 103L540 127L720 99L900 112L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
                    
                    <path id="wave16" className={styles.wave16} style={{ visibility: 'hidden' }} d="M0 55L180 8L360 40L540 64L720 23L900 51L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
                    <path id="wave17" className={styles.wave17} style={{ visibility: 'hidden' }} d="M0 57L180 64L360 104L540 87L720 78L900 99L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
                    <path id="wave18" className={styles.wave18} style={{ visibility: 'hidden' }} d="M0 128L180 97L360 140L540 108L720 100L900 87L900 151L720 151L540 151L360 151L180 151L0 151Z"></path>
                </svg>
            </div>

            <div className={`${styles.section} ${styles.stack}`}>
                <div className={styles.textContainer}>
                    <div ref={stackButtonIconRef}  className={styles.stackText}>{t('homepage.havealook')}</div>
						<Button 
						buttonStyle="filled"
						text={t('homepage.designprocess')}
						onClick={() => {
							navigate('/process');
						}}
                    />
                </div>
                <div className={`${(inView1 || inView2)? styles.show : styles.hidden} ${styles.stackIcons}`}>
                    <div className={styles.html} style={{transitionDelay: '0ms'}}>
						<Icon icon="vscode-icons:file-type-html"/>
						<span>HTML</span>
					</div>
                    <div className={styles.css} style={{transitionDelay: '70ms'}}>
						<Icon icon="vscode-icons:file-type-css"/>
						<span>CSS</span>
					</div>
                    <div className={styles.js} style={{transitionDelay: '140ms'}}>
						<Icon icon="vscode-icons:file-type-js-official"/>
						<span>JS</span>
					</div>
                    <div className={styles.react} style={{transitionDelay: '210ms'}}>
						<Icon icon="vscode-icons:file-type-reactjs"/>
						<span>React</span>
					</div>
                    <div className={styles.redux} style={{transitionDelay: '290ms'}}>
						<Icon icon="logos:redux"/>
						<span>Redux</span>
					</div>
                    <div className={styles.node} style={{transitionDelay: '360ms'}}>
						<Icon icon="vscode-icons:file-type-node"/>
						<span>Node</span>
					</div>
                    <div className={styles.express} style={{transitionDelay: '430ms'}}>
						<Icon icon="logos:express"/>
						<span>Express</span>
					</div>
                    <div className={styles.passport} style={{transitionDelay: '500ms'}}>
						<Icon icon="logos:passport"/>
						<span>Passport</span>
					</div>
                    <div ref={stackLastIconRef}  className={styles.postgresql} style={{transitionDelay: '570ms'}}>
						<Icon icon="logos:postgresql"/>
						<span>PostgreSQL</span>
					</div>
                </div>
				<span>Stack</span>
				<hr/>
				<span>Tools</span>
				<div className={`${(inView1 || inView2)? styles.show : styles.hidden} ${styles.stackIcons}`}>
                    <div className={styles.figma} style={{transitionDelay: '100ms'}}>
						<Icon icon="logos:figma"/>
						<span>Figma</span>
					</div>
                    <div className={styles.vscode} style={{transitionDelay: '170ms'}}>
						<Icon icon="logos:visual-studio-code"/>
						<span>VScode</span>
					</div>
                    <div className={styles.git} style={{transitionDelay: '240ms'}}>
						<Icon icon="vscode-icons:file-type-git"/>
						<span>Git</span>
					</div>	
					<div className={styles.github} style={{transitionDelay: '310ms'}}>
						<Icon icon="bytesize:github"  color='black'/>
						<span>GitHub</span>
					</div>
					<div className={styles.supabase} style={{transitionDelay: '380ms'}}>
						<Icon icon="logos:supabase-icon"/>
						<span>Supabase</span>
					</div>
					<div className={styles.netlify} style={{transitionDelay: '450ms'}}>
						<Icon icon="vscode-icons:file-type-netlify"/>
						<span>Netlify</span>
					</div>
					<div className={styles.netlify} style={{transitionDelay: '520ms'}}>
						<Icon icon="simple-icons:railway"/>
						<span>Railway</span>
					</div>
					<div className={styles.netlify} style={{transitionDelay: '590ms'}}>
						<Icon icon="logos:swagger"/>
						<span>Swagger</span>
					</div>
				</div>  
            </div>
			<footer>
				<FaGithub className={styles.github} onClick={() => { window.location.href='https://github.com/LongWyrsch/Grocery-list_frontend' }}/>
				<FaLinkedin className={styles.linkedin} onClick={() => { window.location.href='https://de.linkedin.com/in/long-wyrsch-9141a156?original_referer=' }}/>
                <p>long.nqw@gmail.com</p>
			</footer>
		</div>
	);
};




















