import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import $ from 'jquery';

// Material Design
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Custom Components
import GameCard from './GameCard';
import StandingsTable from './StandingsTable';
import UpcomingGameCard from './UpcomingGameCard';
import Spinner from './Spinner';
import Title from './Title';

// other
import api from '../api';
import colors from '../colors';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      stats: [],
      upcomingGames: [],
      playerPictures: {},
      loading: true,
      isMobile: false,
    };
    window.scrollTo(0, 0);
  }
  async componentDidMount () {
    const isMobile = window.innerWidth < 800;
    window.isMobile = isMobile;
    this.setState({ isMobile });
    $(window).resize(() => {
      const isMobile = window.innerWidth < 800;
      window.isMobile = isMobile;
      this.setState({ isMobile });
    })
    const { statsList, upcomingGames, playerPictureMap, results } = await api.getData();
    this.setState({results, stats: statsList, upcomingGames, playerPictures: playerPictureMap, loading: false});
  }
  render() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }
    const resultClasses = 'results-grid ' + (this.state.isMobile ? 'grid-1-col' : 'grid-2-col');
    return (
      <div className="home-page" >
        <Title />
        <div style={{ width: '100%', height: '10px'}}/>
          <Fade><StandingsTable stats={this.state.stats}/></Fade>
        <div className="results-flex">
          <div className={resultClasses}>
            {this.state.results.map((result) => {
              return (
                <Flip bottom duration={500} delay={200}>
                  <GameCard key={result.players.join()} result={result}/>
                </Flip>
              );
            })}
          </div>
          <div className={resultClasses}>
            {this.state.upcomingGames.map((game) => {
              return (
                <Flip bottom duration={500}>
                  <UpcomingGameCard
                    key={game.players.join(game.date)}
                    date={game.date}
                    players={game.players}
                  />
                </Flip>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
