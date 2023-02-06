import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './Process.module.css';

// components
import { Mermaid } from './Mermaid';
import { ganttData } from './ganttData';
import { flowChartData } from './flowChartData';

// libs
import { useTranslation } from 'react-i18next';
import { LanguagePicker } from '../../features/languages/components/LanguagePicker';
import { Icon } from '@iconify/react';

export const Process = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const links = document.querySelectorAll('.tocHeader');
	for (const link of links) {
		link.addEventListener('click', clickHandler);
	}
	function clickHandler(e) {
		e.preventDefault();

		const href = this.getAttribute('href');

		document.querySelector(href).scrollIntoView({
			behavior: 'smooth',
		});
	}

	return (
		<div className={styles.processWrapper}>
			<div className={styles.buttons}>
				<div
					className={styles.arrow}
					onClick={() => {
						navigate('/');
					}}
				>
					<Icon icon="mdi:arrow-left-circle-outline" style={{ width: '3rem', height: '3rem' }} />
					{t('general.back')}
				</div>
				<div className={styles.language}>
					<LanguagePicker />
				</div>
			</div>
			<div className={styles.textWrapper}>
				<h1>{t('process.title')}</h1>
				<p className={styles.welcome}>{t('process.welcome')}</p>
				<ul className={styles.toc}>
					<li href="#tocIntro" className="tocHeader">
						{t('process.tocIntro')}
					</li>
					<li href="#tocTechStack" className="tocHeader">
						{t('process.tocTechStack')}
					</li>
					<li href="#tocDependencies" className="tocHeader">
						{t('process.tocDependencies')}
					</li>
					<li href="#tocTools" className="tocHeader">
						{t('process.tocTools')}
					</li>
					<li href="#tocUI" className="tocHeader">
						{t('process.tocUI')}
					</li>
					<li href="#tocAPI" className="tocHeader">
						{t('process.tocAPI')}
					</li>
					<li href="#tocDatabase" className="tocHeader">
						{t('process.tocDatabase')}
					</li>
					<li href="#tocSecurity" className="tocHeader">
						{t('process.tocSecurity')}
					</li>
					<li href="#tocTesting" className="tocHeader">
						{t('process.tocTesting')}
					</li>
					<li href="#tocBreakdown" className="tocHeader">
						{t('process.tocBreakdown')}
					</li>
				</ul>

				<section  className={styles.tocIntro}>
					<h2 id="tocIntro">{t('process.tocIntro')}</h2>
					<p>{t('process.introText1')}<a href="https://www.codecademy.com/learn/paths/full-stack-engineer-career-path">{t('process.introText2')}</a>{t('process.introText3')}</p>
					
					
					<p>{t('process.introText4')}</p>
					<p>{t('process.introText5')}</p>
					<ul>
						<li>{t('process.version')}</li>
						<li>{t('process.reactFrontend')}</li>
						<li>{t('process.responsiveness')}</li>
						<li>{t('process.nodeBackend')}</li>
						<li>{t('process.auth')}</li>
						<li>{t('process.postgresql')}</li>
						<li>{t('process.OpenAPI')}</li>
						<li>{t('process.security')}</li>
						<li>{t('process.testing')}</li>
					</ul>
					<div className={styles.flowChart}>
						<Mermaid chart={flowChartData} />
					</div>
					<p>{t('process.introText6')}</p>
					<h3>{t('process.lessons')}</h3>
					<p>{t('process.cssdesign')}</p>
					<p>{t('process.endpoints')}</p>
					<p>{t('process.testing1')}</p>
				</section>

				<section className={styles.tocTechStack}>
					<h2 id='tocTechStack'>{t('process.tocTechStack')}</h2>
					<ul>
						<li>
							<span>HTML</span>
						</li>
						<li>
							<span>CSS</span>
						</li>
						<li>
							<span>JS</span>
						</li>
						<li>
							<span>React ( + react-router-dom)</span>
						</li>
						<li>
							<span>Redux</span>
						</li>
						<li>
							<span>Node.js</span>
						</li>
						<ul>
							<li>
								<span>Express.js (express-session)</span>
							</li>
							<li>
								<span>Passport.js (passport-local + passport-google-oauth20)</span>
							</li>
						</ul>
						<li>
							<span>PostgreSQL (via Supabase)</span>
						</li>
					</ul>
				</section>

				
				<section className={styles.tocDependencies}>
					<h2 id="tocDependencies">{t('process.tocDependencies')}</h2>
					<p>{t('process.thanks')}</p>
					<ul>
						<h3>Frontend</h3>
						<li><span><a href="https://iconify.design/">Iconify for React</a> {t('process.iconify')}</span></li>
						<li><span><a href="https://boringavatars.com/">Boring Avatars</a> {t('process.avatar')}</span></li>
						<li><span><a href="https://react.i18next.com/">react-i18next</a> {t('process.i18next')}</span></li>
						<li><span><a href="https://thednp.github.io/kute.js/">KUTE.js</a> {t('process.kute')}</span></li>
						<li><span><a href="https://mermaid.js.org/">Mermaid</a> {t('process.mermaid')}</span></li>
						<li><span><a href="https://github.com/atlassian/react-beautiful-dnd#readme">react-beautiful-dnd</a> {t('process.dnd')}</span></li>
						<li><span><a href="https://github.com/react-grid-layout/react-grid-layout">react-grid-layout</a> {t('process.grid')}</span></li>
						<li><span><a href="https://github.com/react-icons/react-icons#readme">React Icons</a> {t('process.icon')}</span></li>
						<li><span><a href="https://github.com/thebuilder/react-intersection-observer#readme">react-intersection-observer</a> {t('process.observer')}</span></li>
						<li><span><a href="https://react-scroll-parallax.damnthat.tv/docs/intro">React Scroll Parallax</a> {t('process.parallax')}</span></li>
						<li><span><a href="https://github.com/uuidjs/uuid">uuid</a> {t('process.uuid')}</span></li>
						<li><span><a href="https://jestjs.io/">Jest</a> {t('process.jest1')}</span></li>
						<li><span><a href="https://testing-library.com/docs/react-testing-library/intro/">React Testing Library</a> {t('process.RTL')}</span></li>
						<li><span><a href="https://mswjs.io/">msw</a> {t('process.msw')}</span></li>
						<h3>Backend</h3>
						<li><span><a href="https://github.com/hapijs/joi#readme">joi</a> {t('process.joi')}</span></li>
						<li><span><a href="https://github.com/expressjs/cors">cors</a> {t('process.cors')}</span></li>
						<li><span><a href="https://github.com/kelektiv/node.bcrypt.js">node.bcrypt.js</a> {t('process.bcrypt')}</span></li>
						<li><span><a href="https://github.com/motdotla/dotenv">dotenv</a> {t('process.env')}</span></li>
						<li><span><a href="https://github.com/express-validator/express-validator">express-validator</a> {t('process.expval')}</span></li>
						<li><span><a href="https://github.com/helmetjs/helmet">helmet</a> {t('process.helmet')}</span></li>
						<li><span><a href="https://github.com/uuidjs/uuid">uuid</a> {t('process.uuidCSRF')}</span></li>
						<li><span><a href="https://jestjs.io/">Jest</a> {t('process.jest2')}</span></li>
						<li><span><a href="https://github.com/ladjs/supertest">Supertest</a> {t('process.supertest')}</span></li>
					</ul>
				</section>


				<section className={styles.tocTools}>
					<h2 id="tocTools">{t('process.tocTools')}</h2>
					<ul>
						<li><span><a href="https://www.figma.com/">Figma</a> {t('process.figma')}</span></li>
						<li><span><a href="https://dbdiagram.io/home">dbdiagram.io</a> {t('process.dbdiagram')}</span></li>
						<li><span><a href="https://supabase.com/">Supabase</a> {t('process.supabase')}</span></li>
						<li><a href="https://code.visualstudio.com/">Visual Studio Code</a> {' '}</li>
						<li><span><a href="https://git-scm.com/">Git</a> {t('process.git')}</span></li>
						<li><span><a href="https://github.com/">GitHub</a> {t('process.github')}</span></li>
						<li><span><a href="https://www.netlify.com/">Netlify</a> {t('process.netlify')}</span></li>
						<li><span><a href="https://railway.app/">Railway</a> {t('process.railway')}</span></li>
						<li><span><a href="https://editor.swagger.io/?url=https://raw.githubusercontent.com/LongWyrsch/Grocery-list_backend/main/openapi.yaml">Swagger Editor</a> {t('process.swagger')}</span></li>
						<li><span><a href="https://fdc.nal.usda.gov/api-guide.html">USDA FoodData Central API</a> {t('process.usda')}</span></li>
					</ul>
				</section>


				<section className={styles.tocUI}>
					<h2 id="tocUI">{t('process.tocUI')}</h2>
					<p>
						{t('process.ui1')}
						<a href="https://www.figma.com/file/9OlfnA8kMP0qOKD7AdNueG/Grocery-list-test-colors?node-id=49823%3A12141&t=U9DtttpAPiU3KGKu-1">{t('process.ui2')}</a>.
					</p>
					<ul>
						<li>{t('process.ui3')}</li>
						<li>
							<a href="https://www.figma.com/community/file/1035203688168086460">Material 3 Design Kit</a>
							{t('process.ui4')}
						</li>
						<li>
							<a href="https://www.figma.com/community/plugin/1034969338659738588/Material-Theme-Builder">Material Theme Builder</a>
							{t('process.ui5')}
						</li>
						<li>
							<a href="https://www.figma.com/community/plugin/816737626312049592">Export styles to CSS variables</a>
							{t('process.ui6')}
						</li>
					</ul>
					<iframe title="wireframe" style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F9OlfnA8kMP0qOKD7AdNueG%2FGrocery-list-test-colors%3Fnode-id%3D52696%253A23854%26t%3DYErgZuNh3u14Asp6-1" allowFullScreen></iframe>
					<div className={styles.figureDescription}>Wireframe</div>
				</section>

				<section className={styles.tocAPI}>
					<h2 id="tocAPI">{t('process.tocAPI')}</h2>
					<p>
						<a href="https://editor.swagger.io/?url=https://raw.githubusercontent.com/LongWyrsch/Grocery-list_backend/main/openapi.yaml">{t('process.api1')}</a>
						{t('process.api2')}
					</p>
				</section>

				<section className={styles.tocDatabase}>
					<h2 id="tocDatabase">{t('process.tocDatabase')}</h2>
					<div>{t('process.databaseText')}</div>
					<iframe title="schema" width="560" height="315" src="https://dbdiagram.io/embed/639da5ca99cb1f3b55a1fb97"></iframe>
					<div className={styles.figureDescription}>{t('process.schema')}</div>
				</section>

				<section className={styles.tocSecurity}>
					<h2 id="tocSecurity">{t('process.tocSecurity')}</h2>
					<ul>
						<li><span><b>{t('process.security1')}</b> {t('process.security2')}</span></li>
						<li><span><b>{t('process.security3')}</b> {t('process.security4')}</span></li>
						<li><span><b>{t('process.security5')}</b> {t('process.security6')}</span></li>
						<li><span><b>{t('process.security7')}</b> {t('process.security8')}</span></li>
						<li><span><b>{t('process.security9')}</b> {t('process.security10')}</span></li>
						<li><span><b>{t('process.security11')}</b> {t('process.security12')}</span></li>
					</ul>
				</section>

				<section className={styles.tocTesting}>
					<h2 id="tocTesting">{t('process.tocTesting')}</h2>
					<p>{t('process.testing2')}</p>
					<p>{t('process.testing3')}</p>
					<ul>
						<li><a href='https://longwyrsch.github.io/Grocery-list_frontend_coverage/'>{t('process.testing6')}</a></li>
						<li>{t('process.testing4')}</li>
					</ul>
					<br/>
					<ul>
						<li><a href='https://longwyrsch.github.io/Grocery-list_backend_coverage/'>{t('process.testing7')}</a></li>
						<li>{t('process.testing5')}</li>
					</ul>
				</section>

				<section className={styles.tocBreakdown}>
					<h2 id="tocBreakdown">{t('process.tocBreakdown')}</h2>
				</section>
			</div>
			<div className={styles.gantt}>
				<Mermaid chart={ganttData} />
			</div>
		</div>
	);
};
