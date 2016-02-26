var faker = require('faker');

var members = [];
var companies = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0 ; i < 20; i++) {
  var id = i + 1;
  companies[i] = {
    id: id,
    attrs: {
      'name': faker.company.companyName()
    }
  }
}

for (var i = 0 ; i < 50; i++) {
  var id = i + 1;
  members[i] = {
    id: id,
    rels: {
      company: getRandom(1, 20)
    },
    attrs: {
      'first-name': faker.name.firstName(),
      'last-name': faker.name.lastName(),
    }
  }
}

function getMembersByCompany(companyId) {
  var ms = [];
  for (var i = 0 ; i < 50; i++) {
    var member = members[i];
    if (member.rels.company === companyId) {
      ms.push(member);
    }
  }
  return ms;
}

module.exports = {
  _members: members,
  _companies: companies,
  getCompanies: function() {
    var cs = [];
    for (var i = 0; i < companies.length; i++) {
      var record = companies[i];
      var members = getMembersByCompany(record.id);
      cs.push({
        type: 'companies',
        id: record.id,
        attributes: record.attrs,
        relationships: {
          members: {
            data: members.map(function(member) {
              return {
                type: 'members',
                id: member.id
              };
            })
          }
        }
      });
    }
    return cs;
  },
  getMembers: function() {
    var ms = [];
    for (var i = 0; i < members.length; i++) {
      var record = members[i];
      ms.push({
        type: 'members',
        id: record.id,
        attributes: record.attrs,
        relationships: {
          company: {
            data: {
              id: record.rels.company,
              type: 'companies'
            }
          }
        }
      });
    }
    return ms;
  }
};
