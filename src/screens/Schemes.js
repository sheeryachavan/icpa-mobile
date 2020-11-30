import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
  SceneRendererProps,
} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {Text} from 'galio-framework';
import {icpaTheme} from '../constants';
import Pmu from './SchemesModules/Pmu';
import Tmu from './SchemesModules/Tmu';
import Incident from './SchemesModules/Incident';
import Accident from './SchemesModules/Accident';
import Adm from './SchemesModules/Admins';
import List from './SchemesModules/List';

const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample() {
  const state = useSelector((_state) => _state.dataLogin);
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'tmu', title: 'Temperorily Medically Unfit'},
    {key: 'pmu', title: 'Permenantly Medically Unfit'},
    {key: 'incident', title: 'Incident Grounding'},
    {key: 'accident', title: 'Accident Grounding'},
    {key: 'adminstrator', title: 'Administrative Grounding'},
  ]);


  const renderScene = SceneMap({
    tmu: Tmu,
    pmu: Pmu,
    incident: Incident,
    accident: Accident,
    adminstrator: Adm,
  });

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );
  const role = state.profile.role;

  if (role !== 'admin' && role !== 'namager') {
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    );
  } else {
    return <List role={role} />;
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: icpaTheme.COLORS.WHITE,
  },
  tab: {
    width: 200,
  },
  indicator: {
    backgroundColor: icpaTheme.COLORS.PRIMARY,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    color: icpaTheme.COLORS.PRIMARY,
  },
});
