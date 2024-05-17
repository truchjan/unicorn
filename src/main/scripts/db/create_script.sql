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