const admin = require("firebase-admin");
const { query } = require("../query-helper");
const Lodash = require("lodash");


export const insights = {
  async userInsights(_, { uid, oid , lastInsightID , numberOfResultsToGrab}, ctx) {
  //  if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    const organizationuserstreamsRef = admin.database().ref(`organization_user_streams/${oid}/${uid}`);
    let userInsightSnap = (await organizationuserstreamsRef.once("value"));
    let insightsIds = [];
    userInsightSnap.forEach(snap => {
      let iid = snap.key;
    
     insightsIds.push(iid);
    });


    var streamKey =insightsIds[0],
    feed_table = 'stream_insights';

  console.log("Running getInsights() for stream...", streamKey);
  var refs = [];
  var insight_ids = null;
  if ( lastInsightID === '' )
  {
    insight_ids = (await admin.database().ref(`${feed_table}/${streamKey}`).orderByKey().limitToLast(numberOfResultsToGrab).once("value")).val();
  }
  else
  {
    insight_ids = (await admin.database().ref(`${feed_table}/${streamKey}`).orderByKey().endAt(lastInsightID).limitToLast(numberOfResultsToGrab + 1).once("value")).val();
  }

  let insightsKeys = [];
  for (var key in insight_ids) {
    if (insight_ids.hasOwnProperty(key)) {
        insightsKeys.push(key);
    }
}
console.log( 'insightsKeys ', insightsKeys);
  let insights = [];
  for (const r of insightsKeys) {
    
    let refins =  admin.database().ref(`insights/${r}`);
   // console.log( 'refins ', refins.toString());
    let ins = (await refins.once("value")).val();
  
    insights.push(ins)
  
    let entity = ins;
    //console.log( 'ENTRIES ' , entity)
    entity["_id"] = r;
    let insight_type = 'insight:' + entity.category + "_" + entity.type + "_" + entity.version;
    
   // console.log( 'ENTRIES ' , entity , entity._id, insight_type);
  };

  
  insights.forEach(i => {
    console.log('insight  ' , i);
});
  //  console.log('insights data ' , insights);
  
    return true;
  }
};
