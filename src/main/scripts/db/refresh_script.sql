-- drop script
alter table history drop constraint fk_history_link;

drop table if exists link;
drop table if exists history;

-- create script
create table link
(
    link_id             bigint not null auto_increment,
    name                varchar(255) not null,
    url                 varchar(255) not null,
    image               longtext,
    description         varchar(1000),
    available_firefox   bit not null,
    available_chrome    bit not null,
    active              bit not null,
    new_tab             bit not null,
    constraint pk_link primary key (link_id)
);

create table history
(
    history_id          bigint not null auto_increment,
    property            varchar(255) not null,
    changed_from        varchar(1000) not null,
    changed_to          varchar(1000) not null,
    history_link_id     bigint,
    constraint pk_history primary key (history_id)
);

alter table history add constraint fk_history_link foreign key (history_link_id) references link (link_id);

-- insert script
insert into link(name, url, image, description, available_firefox, available_chrome, active, new_tab)
values ('Google', 'www.google.com', 'IMAGE', 'This is google.', 1, 1, 0, 1);

insert into link(name, url, image, description, available_firefox, available_chrome, active, new_tab)
values ('Facebook', 'www.facebook.com', 'IMAGE', 'This is facebook.', 1, 1, 1, 0);

insert into link(name, url, image, description, available_firefox, available_chrome, active, new_tab)
values ('Youtube', 'www.youtube.com', 'IMAGE', 'Great platform to watch videos.', 1, 1, 1, 0);

insert into link(name, url, image, description, available_firefox, available_chrome, active, new_tab)
values ('Unicorn', 'www.unicorn.com', 'IMAGE', 'Very nice company.', 1, 1, 1, 1);

insert into link(name, url, image, description, available_firefox, available_chrome, active, new_tab)
values ('Chrome gang', 'www.chromegang.com', 'IMAGE', 'We love chrome.', 0, 1, 1, 1);

insert into link(name, url, image, description, available_firefox, available_chrome, active, new_tab)
values ('Firefox crew', 'www.firefoxcrew.com', 'IMAGE', 'Firefox is the best.', 1, 0, 0, 1);