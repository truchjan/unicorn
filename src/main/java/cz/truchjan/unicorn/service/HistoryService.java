package cz.truchjan.unicorn.service;

import cz.truchjan.unicorn.exception.ResourceNotFoundException;
import cz.truchjan.unicorn.model.History;
import cz.truchjan.unicorn.model.Link;

import java.util.List;

public interface HistoryService {

	List<History> getLinksHistory(Long linkId) throws ResourceNotFoundException;

	Link addHistory(Link link, Link linkUpdated);
}
