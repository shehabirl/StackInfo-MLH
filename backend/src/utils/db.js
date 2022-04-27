import { connect as _connect } from 'mongoose';
import config from '../config/dev';

const connect = (url = config.dbURL, opts = {}) => {
    return _connect(
        url,
        {}, err => {
            if (err) throw err;
            console.log('Connected to MongoDB!')
        }
    )
}
export default connect;