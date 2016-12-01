var slugify = require('slugify')

module.exports = {
    attributes: {
        title : 'string',
        alias : {
            type : 'string',
            unique : true
        },
        excerpt : 'string',
        imageFd : 'string',
        body : 'string',
        fd : {
            type : 'string',
            required : true
        },
        filename : {
            type : 'string',
            required : true
        },
        category : {
            model: 'blogcategory',
            required: true
        },
        published : {
            type: 'boolean',
            defaultsTo : true
        },
        createdAt : {
            type: 'datetime',
            defaultsTo: function() {return new Date();}
        },
        publishedAt : {
            type: 'datetime'
        },
        updatedAt : {
            type: 'datetime',
            defaultsTo: function() {return new Date();}
        }
    },
    beforeCreate:function(values,next) {
        values.alias = slugify(values.title)
        next();
    },
    beforeUpdate:function(values,next) {
        values.updatedAt= new Date();
        values.alias = slugify(values.title)
        next();
    },
    seedData:[
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655e'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655e'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655f'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655f'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c566560'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c566560'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c566561'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c566561'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655e'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655e'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57d449fa30cf49301c56655f'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57667b214e9cdb942f463a14'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57667b214e9cdb942f463a14'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57667b214e9cdb942f463a14'
        },
        {
            title: 'Praesent augue felis, pharetra ut aliquam non, euismod bibendum erat',
            excerpt : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue.',
            body : 'Vestibulum vehicula erat sit amet augue pretium, non auctor lacus congue. In aliquam et eros nec dictum. Donec turpis mauris, posuere in fermentum id, egestas sit amet nunc. Nullam dapibus fermentum metus in congue. Nam volutpat mollis quam quis convallis. In hendrerit accumsan nibh, non ultricies sapien venenatis quis. Ut est justo, convallis non congue eu, congue vitae dolor. Vestibulum eros magna, dignissim a lectus vestibulum, maximus blandit urna. Cras eget aliquet arcu. Mauris mattis id sapien at tincidunt. Suspendisse potenti. Aenean sit amet aliquam ante. Donec ultrices lorem vitae diam sodales congue. Nulla eu nulla quis ante posuere posuere.',
            category : '57667b214e9cdb942f463a14'
        }]
};
