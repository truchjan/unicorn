package cz.truchjan.unicorn.service;

import cz.truchjan.unicorn.exception.ResourceNotFoundException;
import cz.truchjan.unicorn.model.Link;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LinkService {

	List<Link> getAllLinks();

	ResponseEntity<Link> getLinkById(Long id) throws ResourceNotFoundException;

	ResponseEntity<Link> addLink(Link link);

	ResponseEntity<Link> updateLink(Long id, Link linkUpdated) throws ResourceNotFoundException;

	ResponseEntity<?> deleteLink(Long id) throws ResourceNotFoundException;
}
