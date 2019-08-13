import React from 'react';
import { injectIntl } from 'react-intl';

import errorBoundaryHOC from '@/lib/error-boundary-hoc.jsx';
import OpcodeLabels from '@/lib/opcode-labels';

import MonitorListComponent from '../components/monitor-list/monitor-list.jsx';

class MonitorList extends React.Component {
  constructor(props) {
    super(props);
    OpcodeLabels.setTranslatorFunction(props.intl.formatMessage);
  }

  handleMonitorChange() {}

  render() {
    return <MonitorListComponent onMonitorChange={this.handleMonitorChange} {...this.props} />;
  }
}

export default errorBoundaryHOC('Monitors')(injectIntl(MonitorList));
