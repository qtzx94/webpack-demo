import _ from 'lodash';
import $ from 'jquery';

const dom = $('div');
dom.html(_.join(['qtzx', '94', 'hello'], '--'));
$('body').append(dom);